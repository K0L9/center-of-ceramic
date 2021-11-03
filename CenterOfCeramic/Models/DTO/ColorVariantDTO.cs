using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models.DTO
{
    public class ColorVariantDTO
    {
        public ICollection<PhotoDTO> Images { get; set; }
        public string ColorHex { get; set; }
        public string IdentifierNumber { get; set; }

    }
}
