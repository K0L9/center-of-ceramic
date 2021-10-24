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
                cfg.CreateMap<ProductDTO, Product>().ForMember(x => x.Photos, opt => opt.Ignore());
                cfg.CreateMap<Product, ProductDTO>();
            });
            mapper = new Mapper(config);

            _db = db;
        }
        public IEnumerable<Product> GetAllProducts() => _db.Products.Include(x => x.Photos);
        public async Task<Product> AddProduct(ProductDTO productDTO)
        {
            try
            {
                var photos = new List<Photo>();
                foreach (var el in productDTO.Images)
                {
                    if (el.Base64Str == String.Empty)
                        continue;

                    var bytes = Convert.FromBase64String(el.Base64Str);
                    using (var imageFile = new FileStream(@"C:\Users\Kolya\Desktop\" + el.Filename, FileMode.Create))
                    {
                        imageFile.Write(bytes, 0, bytes.Length);
                        imageFile.Flush();
                    }
                    photos.Add(new Photo() { URL = @"http://127.0.0.1:5002/" + el.Filename });
                }

                var product = mapper.Map<Product>(productDTO);
                product.Photos = photos;
                var addedProd = await _db.Products.AddAsync(product);
                _db.SaveChanges();
                return addedProd.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception("Error with add product. Try again");
            }
        }
        public void DeleteProduct(int id)
        {
            try
            {
                var product = _db.Products.Find(id);
                if (product == null)
                    throw new Exception($"Product with id {id} is not found");

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
                var product = _db.Products.Find(id);
                if (product == null)
                    throw new Exception($"Product with id {id} is not found");

                int oldId = product.Id;

                mapper.Map<ProductDTO, Product>(productDTO, product);
                product.Id = oldId;
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
