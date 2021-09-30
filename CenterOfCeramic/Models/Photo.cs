using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string URL { get; set; }

        //Foriegn key
        public int ProductId { get; set; }

        //Navigation key
        public virtual Product Product { get; set; }
    }
}
