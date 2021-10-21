using AutoMapper;
using CenterOfCeramic.Data;
using CenterOfCeramic.Models;
using CenterOfCeramic.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
                cfg.CreateMap<string, Photo>().ForMember(nameof(Photo.URL), opt => opt.MapFrom(x => x.ToString()));
            });
            mapper = new Mapper(config);

            _db = db;
        }
        public IEnumerable<Product> GetAllProducts() => _db.Products.Include(x => x.Photos);
        public async Task<Product> AddProduct(ProductDTO productDTO)
        {
            try
            {
                var product = mapper.Map<Product>(productDTO);
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
