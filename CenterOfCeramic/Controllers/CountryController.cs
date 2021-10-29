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
    public class CountryController : ControllerBase
    {
        private readonly CountryService _service;
        public CountryController(CountryService service)
        {
            _service = service;
        }

        [HttpGet("get-all-countries")]
        public IActionResult GetAllCountries()
        {
            return Ok(_service.GetAllCountries());
        }
        [HttpPost("add-country")]
        public IActionResult AddCountry([FromBody] SimpleCountryDTO countryDTO)
        {
            try
            {
                var newCountry = _service.AddCountry(countryDTO);
                return Ok(newCountry);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete-country/{id}")]
        public IActionResult DeleteCountry(int id)
        {
            try
            {
                _service.DeleteCountry(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("edit-country/{id}")]
        public IActionResult EditCountry(int id, [FromBody] SimpleCountryDTO countryDTO)
        {
            try
            {
                var country = _service.EditCountry(id, countryDTO);
                return Ok(country);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
