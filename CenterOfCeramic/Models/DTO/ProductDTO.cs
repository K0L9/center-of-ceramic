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
        public int CountryId { get; set; }
        public int Quantity { get; set; }
        public bool IsSale { get; set; }
        public int? OldPrice { get; set; }
        public ICollection<ColorVariantDTO> Variants { get; set; }
    }

    public class PhotoDTO
    {
        public string Filename { get; set; }
        public string Base64Str { get; set; }
        public bool IsDeleted { get; set; }
    }
}
