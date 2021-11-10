using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Models.DTO
{
    public class ReviewDTO
    {
        public int Rating { get; set; }
        public string Body { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public int ProductId { get; set; }
    }
}
