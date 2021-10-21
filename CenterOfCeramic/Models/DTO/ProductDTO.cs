using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models.DTO
{
    public class ProductDTO
    {
        public string Title { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public virtual ICollection<string> Photos { get; set; }

    }
}
