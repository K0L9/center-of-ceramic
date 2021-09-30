using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }

        //Foreign key
        public int CategoryId { get; set; }

        //Navigation props
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual Category Category { get; set; }

        public Product()
        {
            Photos = new HashSet<Photo>();
        }
    }
}
