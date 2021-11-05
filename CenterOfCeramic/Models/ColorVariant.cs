using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class ColorVariant
    {
        public int Id { get; set; }
        public ICollection<Photo> Images { get; set; }
        public string ColorHex { get; set; }
        public string IdentifierNumber { get; set; }
        

        //foreign key
        public int ProductId { get; set; }

        //navigation props
        public Product Product  { get; set; }

        public ColorVariant()
        {
            Images = new HashSet<Photo>();
        }
    }
}
