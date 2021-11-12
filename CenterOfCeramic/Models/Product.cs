using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
        public int? Quantity { get; set; }

        public bool IsSale { get; set; }
        public int? OldPrice { get; set; }

        public DateTime? DateAdded { get; set; }

        //Not mapped props
        [NotMapped]
        public int Rating
        {
            get
            {
                if (Reviews.Count == 0)
                    return 0;
                return (int)Math.Round(Reviews.Select(x => x.Rating).Average(), 0);
            }
        }
        [NotMapped]
        public bool IsNew
        {
            get
            {
                if (DateAdded == null)
                    return false;
                else
                    return (DateTime.Now - (DateTime)DateAdded).TotalDays < ENV.DaysNewProduct;
            }
        }


        //Foreign key
        public int CategoryId { get; set; }
        public int CountryId { get; set; }

        //Navigation props
        public virtual ICollection<ColorVariant> Variants { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual Category Category { get; set; }
        public virtual Country Country { get; set; }

        public Product()
        {
            Variants = new HashSet<ColorVariant>();
            Reviews = new HashSet<Review>();
        }
    }
}
