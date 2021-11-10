using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public int Rating { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        //foreign
        public int ProductId { get; set; }

        //navigation
        public virtual Product Product { get; set; }
    }
}
