using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Product> Products { get; set; }

        public Category()
        {
            Products = new HashSet<Product>();
        }
    }
}
