using AutoMapper;
using CenterOfCeramic.Data;
using CenterOfCeramic.Models;
using CenterOfCeramic.Models.DTO;
using CenterOfCeramic.Models.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Services
{
    public class CategoryService
    {
        AppDbContext _db;
        Mapper mapper;
        public CategoryService(AppDbContext db)
        {
            var config = new MapperConfiguration(cfg => 
            {
                cfg.CreateMap<SimpleCategoryDTO, Category>();
                cfg.CreateMap<Category, CategoryDTO>().ForMember(nameof(CategoryDTO.ProductCount), opt => opt.MapFrom(x => x.Products.Count));
            });
            mapper = new Mapper(config);

            _db = db;
        }
        public IEnumerable<CategoryDTO> GetAllCategories()
        {
            var categories = _db.Categories.Include(x => x.Products);
            return mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }
        public async Task<Category> AddCategory(SimpleCategoryDTO categoryDTO)
        {
            try
            {
                var category = mapper.Map<Category>(categoryDTO);
                var addedCateg = await _db.Categories.AddAsync(category);
                _db.SaveChanges();
                return addedCateg.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception("Error with add category. Try again");
            }
        }
        public void DeleteCategory(int id)
        {
            try
            {
                var category = _db.Categories.Find(id);
                if (category == null)
                    throw new Exception($"Category with id {id} is not found");

                _db.Categories.Remove(category);
                _db.SaveChanges();
            }
            catch (Exception)
            {
                throw new Exception("Error with delete category. Try again");
            }
        }
        public Category EditCategory(int id, SimpleCategoryDTO categoryDTO)
        {
            try
            {
                var category = _db.Categories.Find(id);
                if (category == null)
                    throw new Exception($"Category with id {id} is not found");

                category.Name = categoryDTO.Name;
                _db.SaveChanges();

                return category;
            }
            catch (Exception)
            {
                throw new Exception($"Error with edit category. Try again");
            }

        }
    }
}
