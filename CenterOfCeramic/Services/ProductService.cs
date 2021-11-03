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
        public IEnumerable<Product> GetAllProducts() => _db.Products.Include(x => x.Variants).ThenInclude(x => x.Select(x => x.Images));
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
                var product = _db.Products.Find(id);
                if (product == null)
                    throw new Exception($"Product with id {id} is not found");

                //foreach (var ph in product.Photos)
                //    _db.Photos.Remove(ph);

                _db.Products.Remove(product);
                _db.SaveChanges();
            }
            catch (Exception)
            {
                throw new Exception("Error with delete product. Try again");
            }
        }
        public Product EditProduct(int id, ProductDTO productDTO)
        {
            try
            {
                var product = _db.Products.SingleOrDefault(x => x.Id == id);//.Include(x => x.Photos);
                if (product == null)
                    throw new Exception($"Product with id {id} is not found");

                int oldId = product.Id;

                mapper.Map<ProductDTO, Product>(productDTO, product);
                product.Id = oldId;

                //var photos = new List<Photo>(product.Photos);

                //for (int i = 0; i < productDTO.Images.Count; i++)
                //{
                //    if (productDTO.Images.ElementAt(i).IsDeleted)
                //    {
                //          photos.RemoveAt(i);
                //    }
                //    else if (productDTO.Images.ElementAt(i).Base64Str != String.Empty) // it is edit photo
                //    {
                //        var bytes = Convert.FromBase64String(productDTO.Images.ElementAt(i).Base64Str);
                //        using (var imageFile = new FileStream(@"E:\borya plutkas\ready\" + productDTO.Images.ElementAt(i).Filename, FileMode.Create))
                //        {
                //            imageFile.Write(bytes, 0, bytes.Length);
                //            imageFile.Flush();
                //        }
                //Photo newPhoto = new Photo() { URL = @"http://127.0.0.1:5002/" + productDTO.Images.ElementAt(i).Filename };

                        //if (photos.Count <= i)
                        //    photos.Add(newPhoto);
                        //else
                        //    photos[i] = newPhoto;
                    //}
                //}

                //product.Photos = photos;

                _db.SaveChanges();

                return null;
            }
            catch (Exception)
            {
                throw new Exception($"Error with edit product. Try again");
            }

        }
    }
}
