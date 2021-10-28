using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models.ViewModels
{
    public class SimpleCategoryDTO
    {
        public string Name { get; set; }
    }
    public class CategoryWithProductsDTO
    {
        public string Name { get; set; }
        public List<string> Products { get; set; }
    }
}
