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
        [HttpGet("get-all-details-products")]
        //This method include categories and countries
        public IActionResult GetAllDetailtsProducts()
        {
            try
            {
                var result = _service.GetAllDetailsProducts();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-product-by-id/{id}")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                var user = _service.GetProductById(id);
                if (user == null)
                    return NotFound();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
        [HttpGet("get-related-product/{id}")]
        public IActionResult GetRelatedProduct(int id)
        {
            try
            {
                var result = _service.GetRelatedProducts(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-new-products")]
        public IActionResult GetNewProducts()
        {
            try
            {
                var result = _service.GetNewProducts();
                if (result.Count() == 0)
                    return BadRequest("No one product");

                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest();
            }
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
