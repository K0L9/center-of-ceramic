using System;
using System.Buffers.Text;
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
        public ICollection<PhotoDTO> Images { get; set; }
    }

    public class PhotoDTO
    {
        public string Filename { get; set; }
        public string Base64Str { get; set; }
    }
}
