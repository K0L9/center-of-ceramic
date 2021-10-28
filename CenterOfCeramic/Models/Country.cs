using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //naviagtion props
        public virtual ICollection<Product> Products { get; set; }

        public Country()
        {
            Products = new HashSet<Product>();
        }
    }
}
