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
                cfg.CreateMap<ProductDTO, Product>();
                cfg.CreateMap<Product, ProductDTO>();
                cfg.CreateMap<ColorVariantDTO, ColorVariant>().ForMember(x => x.Images, opt => opt.Ignore());
            });
            mapper = new Mapper(config);

            _db = db;
        }
        public IEnumerable<Product> GetAllProducts() => _db.Products.Include(nameof(Product.Variants)).Include("Variants.Images");
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

                var addedProduct = await _db.Products.AddAsync(product);
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

                mapper.Map<ProductDTO, Product>(productDTO, product);
                product.Id = oldId;

                int counter = 0;
                foreach (var colVar in productDTO.Variants)
                {
                    var photos = new List<Photo>(product.Variants.ElementAt(counter).Images);

                    for (int i = 0; i < colVar.Images.Count; i++)
                    {
                        if (colVar.Images.ElementAt(i).IsDeleted)
                        {
                            var tmpPhoto = photos.ElementAt(i);
                            if (tmpPhoto != null)
                                photos.Remove(tmpPhoto);
                        }
                        else if (colVar.Images.ElementAt(i).Base64Str != String.Empty) // it is edit photo
                        {
                            var bytes = Convert.FromBase64String(colVar.Images.ElementAt(i).Base64Str);
                            using (var imageFile = new FileStream(@"E:\borya plutkas\ready\" + colVar.Images.ElementAt(i).Filename, FileMode.Create))
                            {
                                imageFile.Write(bytes, 0, bytes.Length);
                                imageFile.Flush();
                            }
                        }

                        Photo newPhoto = new Photo() { URL = @"http://127.0.0.1:5002/" + colVar.Images.ElementAt(i).Filename };

                        if (photos.Count <= i)
                            photos.Add(newPhoto);
                        else
                            photos[i] = newPhoto;
                    }

                    product.Variants.ElementAt(counter++).Images = photos;
                }

                _db.SaveChanges();

                return product;
            }
            catch (Exception)
            {
                throw new Exception($"Error with edit product. Try again");
            }
        }
    }
}