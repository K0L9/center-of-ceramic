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
        public async Task<ColorGroup> AddProduct(List<ProductDTO> productsDTO)
        {
            try
            {
                ColorGroup colorGroup = new ColorGroup();
                foreach (var productDTO in productsDTO)
                {
                    var photos = new List<Photo>();
                    foreach (var el in productDTO.Images)
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

                    var product = mapper.Map<Product>(productDTO);
                    product.Photos = photos;
                    colorGroup.Products.Add(product);
                }

                var addedGroup = await _db.ColorGroups.AddAsync(colorGroup);
                _db.SaveChanges();
                return addedGroup.Entity;
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

                foreach (var ph in product.Photos)
                    _db.Photos.Remove(ph);

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
                var product = _db.Products.Include(x => x.Photos).SingleOrDefault(x => x.Id == id);
                if (product == null)
                    throw new Exception($"Product with id {id} is not found");

                int oldId = product.Id;

                mapper.Map<ProductDTO, Product>(productDTO, product);
                product.Id = oldId;

                var photos = new List<Photo>(product.Photos);

                for (int i = 0; i < productDTO.Images.Count; i++)
                {
                    if (productDTO.Images.ElementAt(i).IsDeleted)
                    {
                        photos.RemoveAt(i);
                    }
                    else if (productDTO.Images.ElementAt(i).Base64Str != String.Empty) // it is edit photo
                    {
                        var bytes = Convert.FromBase64String(productDTO.Images.ElementAt(i).Base64Str);
                        using (var imageFile = new FileStream(@"E:\borya plutkas\ready\" + productDTO.Images.ElementAt(i).Filename, FileMode.Create))
                        {
                            imageFile.Write(bytes, 0, bytes.Length);
                            imageFile.Flush();
                        }
                        Photo newPhoto = new Photo() { URL = @"http://127.0.0.1:5002/" + productDTO.Images.ElementAt(i).Filename };

                        if (photos.Count <= i)
                            photos.Add(newPhoto);
                        else
                            photos[i] = newPhoto;
                    }
                }

                product.Photos = photos;

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
