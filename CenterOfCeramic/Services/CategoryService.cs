using AutoMapper;
using CenterOfCeramic.Data;
using CenterOfCeramic.Models;
using CenterOfCeramic.Models.ViewModels;
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
            var config = new MapperConfiguration(cfg => cfg.CreateMap<CategoryViewModel, Category>());
            mapper = new Mapper(config);

            _db = db;
        }
        public IEnumerable<Category> GetAllCategories() => _db.Categories;
        public async Task<Category> AddCategory(CategoryViewModel categoryVm)
        {
            try
            {
                var category = mapper.Map<Category>(categoryVm);
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
        public Category EditCategory(int id, CategoryViewModel categoryVm)
        {
            try
            {
                var category = _db.Categories.Find(id);
                if (category == null)
                    throw new Exception($"Category with id {id} is not found");

                category.Name = categoryVm.Name;
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
