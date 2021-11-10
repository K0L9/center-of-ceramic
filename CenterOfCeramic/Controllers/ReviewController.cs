using CenterOfCeramic.Models.DTO;
using CenterOfCeramic.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private ReviewService _service;

        public ReviewController(ReviewService service)
        {
            _service = service;
        }

        [HttpPost("add-review")]
        public IActionResult AddReview([FromBody] ReviewDTO reviewDTO)
        {
            try
            {
                var review = _service.AddReview(reviewDTO);
                return Ok(review);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
