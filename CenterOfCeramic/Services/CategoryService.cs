using CenterOfCeramic.Data;
using CenterOfCeramic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Services
{
    public class CategoryService
    {
        AppDbContext _db;
        public CategoryService(AppDbContext db)
        {
            _db = db;
        }
        public IEnumerable<Category> GetAllCategories()
        {
            return _db.Categories;
        }
    }
}
