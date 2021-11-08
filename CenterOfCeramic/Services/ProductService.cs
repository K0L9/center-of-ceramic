using AutoMapper;
using CenterOfCeramic.Data;
using CenterOfCeramic.Models;
using CenterOfCeramic.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Services
{
    public class ProductService
    {
        AppDbContext _db;
        Mapper mapper;
        public ProductService(AppDbContext db)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductDTO, Product>().ForMember(x => x.Variants, opt => opt.Ignore());
                cfg.CreateMap<Product, ProductDTO>();
                cfg.CreateMap<ColorVariantDTO, ColorVariant>().ForMember(x => x.Images, opt => opt.Ignore());
            });
            mapper = new Mapper(config);

            _db = db;
        }
        public IEnumerable<Product> GetAllProducts() => _db.Products.Include(nameof(Product.Variants)).Include("Variants.Images");
        public Product GetProductById(int id) => _db.Products.Include(x => x.Category).Include(x => x.Country)
            .Include(nameof(Product.Variants)).Include("Variants.Images").SingleOrDefault(x => x.Id == id);
        public async Task<Product> AddProduct(ProductDTO productDTO)
        {
            try
            {
                var product = mapper.Map<Product>(productDTO);
                int counter = 0;

                foreach (var colorVariant in productDTO.Variants)
                {
                    var photos = new List<Photo>();
                    foreach (var el in colorVariant.Images)
                    {
                        if (el.Base64Str == String.Empty)
                            continue;

                        var bytes = Convert.FromBase64String(el.Base64Str);

                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(el.Filename);
                        var fullPath = ENV.FilePath + fileName;

                        using (var imageFile = new FileStream(fullPath, FileMode.Create))
                        {
                            imageFile.Write(bytes, 0, bytes.Length);
                            imageFile.Flush();
                        }
                        photos.Add(new Photo() { URL = @"http://127.0.0.1:5002/" + fileName });
                    }

                    product.Variants.ElementAt(counter++).Images = photos;
                }

                var addedProduct = _db.Products.Add(product);
                _db.SaveChanges();
                return addedProduct.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception("Error with add products. Try again");
            }
        }
        public void DeleteProduct(int id)
        {
            try
            {
                var product = _db.Products.Include(nameof(Product.Variants)).Include("Variants.Images").SingleOrDefault(x => x.Id == id);
                if (product == null)
                    throw new Exception($"Product with id {id} is not found");

                foreach (var el in product.Variants)
                {
                    foreach (var ph in el.Images)
                    {
                        _db.Photos.Remove(ph);
                    }
                    _db.ColorVariants.Remove(el);
                }

                _db.Products.Remove(product);
                _db.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error with delete product. Try again");
            }
        }
        public Product EditProduct(int id, ProductDTO productDTO)
        {
            try
            {
                var product = _db.Products.Include(nameof(Product.Variants)).Include("Variants.Images").SingleOrDefault(x => x.Id == id);
                if (product == null)
                    throw new Exception($"Product with id {id} is not found");

                int oldId = product.Id;
                IEnumerable<ColorVariant> oldColorVariants = new List<ColorVariant>(product.Variants);

                mapper.Map<ProductDTO, Product>(productDTO, product);
                product.Id = oldId;

                for (int i = 0; i < product.Variants.Count(); i++)
                {
                    product.Variants.ElementAt(i).ColorHex = productDTO.Variants.ElementAt(i).ColorHex;
                    product.Variants.ElementAt(i).IdentifierNumber = productDTO.Variants.ElementAt(i).IdentifierNumber;
                    _db.SaveChanges();

                    var photos = new List<Photo>(product.Variants.ElementAt(i).Images);

                    for (int j = 0; j < productDTO.Variants.ElementAt(i).Images.Count(); j++)
                    {
                        var thisPhotoDTO = productDTO.Variants.ElementAt(i).Images.ElementAt(j);
                        if (thisPhotoDTO.IsDeleted)
                        {
                            var tmpPhoto = product.Variants.ElementAt(i).Images.ElementAt(j);
                            if(tmpPhoto != null)
                                product.Variants.ElementAt(i).Images.Remove(tmpPhoto);
                            _db.SaveChanges();
                        }
                        else if(thisPhotoDTO.Base64Str != String.Empty)
                        {
                            var bytes = Convert.FromBase64String(thisPhotoDTO.Base64Str);

                            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(thisPhotoDTO.Filename);
                            var fullPath = ENV.FilePath + fileName;

                            using (var imageFile = new FileStream(fullPath, FileMode.Create))
                            {
                                imageFile.Write(bytes, 0, bytes.Length);
                                imageFile.Flush();
                            }

                            var photo = new Photo() { URL = @"http://127.0.0.1:5002/" + fileName };

                            if (j < product.Variants.ElementAt(i).Images.Count)
                                product.Variants.ElementAt(i).Images.ElementAt(j).URL = photo.URL;
                            else
                                product.Variants.ElementAt(i).Images.Add(photo);

                            _db.SaveChanges();
                        }
                    }
                }

                for (int i = product.Variants.Count; i < productDTO.Variants.Count(); i++)
                {
                    var variantDTO = productDTO.Variants.ElementAt(i);
                    var colorVariant = new ColorVariant();

                    colorVariant.ColorHex = variantDTO.ColorHex;
                    colorVariant.IdentifierNumber = variantDTO.IdentifierNumber;

                    for (int j = 0; j < variantDTO.Images.Count(); j++)
                    {
                        var imageDTO = variantDTO.Images.ElementAt(j);

                        if (imageDTO.Base64Str == String.Empty)
                            continue;

                        var bytes = Convert.FromBase64String(imageDTO.Base64Str);

                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageDTO.Filename);
                        var fullPath = ENV.FilePath + fileName;

                        using (var imageFile = new FileStream(fullPath, FileMode.Create))
                        {
                            imageFile.Write(bytes, 0, bytes.Length);
                            imageFile.Flush();
                        }

                        colorVariant.Images.Add(new Photo() { URL = @"http://127.0.0.1:5002/" + fileName });
                    }

                    product.Variants.Add(colorVariant);
                    _db.SaveChanges();
                }


                //int counter = 0;
                //foreach (var colVar in productDTO.Variants)
                //{
                //    List<Photo> photos;
                //    if (oldColorVariants.Count() > counter)
                //        photos = new List<Photo>(oldColorVariants.ElementAt(counter).Images);
                //    else
                //        photos = new List<Photo>();

                //    product.Variants.ElementAt(counter).Images = oldColorVariants.ElementAt(counter).Images;

                //    for (int i = 0; i < colVar.Images.Count; i++)
                //    {
                //        if (colVar.Images.ElementAt(i).IsDeleted)
                //        {
                //            var tmpPhoto = photos.ElementAt(i);
                //            if (tmpPhoto != null)
                //                product.Variants.ElementAt(counter).Images.Remove(tmpPhoto);
                //        }
                //        else if (colVar.Images.ElementAt(i).Base64Str != String.Empty) // it is edit photo
                //        {
                //            var bytes = Convert.FromBase64String(colVar.Images.ElementAt(i).Base64Str);
                //            using (var imageFile = new FileStream(@"E:\borya plutkas\ready\" + colVar.Images.ElementAt(i).Filename, FileMode.Create))
                //            {
                //                imageFile.Write(bytes, 0, bytes.Length);
                //                imageFile.Flush();
                //            }
                //            Photo newPhoto = new Photo() { URL = @"http://127.0.0.1:5002/" + colVar.Images.ElementAt(i).Filename, ColorVariantId = product.Variants.ElementAt(counter).Id };

                //            _db.Photos.Add(newPhoto);

                //            if (product.Variants.ElementAt(counter).Images.Count <= i)
                //                product.Variants.ElementAt(counter).Images.Add(newPhoto);
                //            //else
                //            //    product.Variants.ElementAt(counter).Images.ElementAt(i).URL = @"http://127.0.0.1:5002/" + colVar.Images.ElementAt(i).Filename;
                //        }
                //    }
                //    counter++;

                //    product.Variants.ElementAt(counter++).Images = photos;
                //    _db.SaveChanges();
                //}

                return product;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error with edit product. Try again");
            }
        }
    }
}