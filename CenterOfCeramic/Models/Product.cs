using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public int Price { get; set; }
        [Required]
        public string Description { get; set; }
        public int Quantity { get; set; }

        public bool IsSale { get; set; }
        public int? OldPrice { get; set; }

        //Foreign key
        public int CategoryId { get; set; }
        public int CountryId { get; set; }

        //Navigation props
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual Category Category { get; set; }
        public virtual Country Country { get; set; }

        public Product()
        {
            Photos = new HashSet<Photo>();
            Reviews = new HashSet<Review>();
        }
    }
}
