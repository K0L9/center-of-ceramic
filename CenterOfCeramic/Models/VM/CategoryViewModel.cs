using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models.ViewModels
{
    public class CategoryViewModel
    {
        public string Name { get; set; }
    }
    public class CategoryWithProductsViewModel
    {
        public string Name { get; set; }
        public List<string> Products { get; set; }
    }
}
