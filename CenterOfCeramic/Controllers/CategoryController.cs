using CenterOfCeramic.Models.ViewModels;
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
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _service;
        public CategoryController(CategoryService service)
        {
            _service = service;
        }

        [HttpGet("get-all-categories")]
        public IActionResult GetAllCategories()
        {
            try
            {
                return Ok(_service.GetAllCategories());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPost("add-category")]
        public IActionResult AddCategory([FromBody] SimpleCategoryDTO categoryVm)
        {
            try
            {
                var newCateg = _service.AddCategory(categoryVm);
                return Ok(newCateg);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete-category/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                _service.DeleteCategory(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("edit-category/{id}")]
        public IActionResult EditCategory(int id, [FromBody] SimpleCategoryDTO categoryVm)
        {
            try
            {
                var category = _service.EditCategory(id, categoryVm);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
