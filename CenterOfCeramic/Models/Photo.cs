using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models
{
    public class Photo
    {
        public int Id { get; set; }
        [Required]
        public string URL { get; set; }

        //Foriegn key
        public int ColorVariantId { get; set; }

        //Navigation key
        public virtual ColorVariant ColorVariant { get; set; }
    }
}
