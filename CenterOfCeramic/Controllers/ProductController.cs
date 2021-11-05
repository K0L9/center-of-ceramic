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
    public class ProductController : ControllerBase
    {
        private readonly ProductService _service;
        public ProductController(ProductService service)
        {
            _service = service;
        }

        [HttpGet("get-all-products")]
        public IActionResult GetAllProducts()
        {
            var result = _service.GetAllProducts();
            return Ok(result);
        }
        [HttpPost("add-product")]
        public IActionResult AddProduct([FromBody] ProductDTO productsDTO)
        {
            try
            {
                var newProd = _service.AddProduct(productsDTO);
                return Ok(newProd);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete-product/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                _service.DeleteProduct(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("edit-product/{id}")]
        public IActionResult EditProduct(int id, [FromBody] ProductDTO productDTO)
        {
            try
            {
                var product = _service.EditProduct(id, productDTO);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
