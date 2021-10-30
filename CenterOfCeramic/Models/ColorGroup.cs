using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class ColorGroup
    {
        public int Id { get; set; }
        public ICollection<Product> Products { get; set; }

        public ColorGroup()
        {
            Products = new HashSet<Product>();
        }
    }
}
