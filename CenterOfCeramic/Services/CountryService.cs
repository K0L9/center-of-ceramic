using AutoMapper;
using CenterOfCeramic.Data;
using CenterOfCeramic.Models;
using CenterOfCeramic.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Services
{
    public class CountryService
    {
        AppDbContext _db;
        Mapper mapper;
        public CountryService(AppDbContext db)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<SimpleCountryDTO, Country>();
                cfg.CreateMap<Country, CountryDTO>().ForMember(nameof(CountryDTO.ProductCount), opt => opt.MapFrom(x => x.Products.Count));
            });
            mapper = new Mapper(config);

            _db = db;
        }
        public IEnumerable<CountryDTO> GetAllCountries()
        {
            var countries = _db.Countries.Include(x => x.Products);
            return mapper.Map<IEnumerable<CountryDTO>>(countries);
        }
        public async Task<Country> AddCountry(SimpleCountryDTO countryDTO)
        {
            try
            {
                var country = mapper.Map<Country>(countryDTO);
                var addedCountry = await _db.Countries.AddAsync(country);
                _db.SaveChanges();
                return addedCountry.Entity;
            }
            catch (Exception ex)
            {
                throw new Exception("Error with add country. Try again");
            }
        }
        public void DeleteCountry(int id)
        {
            try
            {
                var country = _db.Countries.Find(id);
                if (country == null)
                    throw new Exception($"Country with id {id} is not found");

                _db.Countries.Remove(country);
                _db.SaveChanges();
            }
            catch (Exception)
            {
                throw new Exception("Error with delete country. Try again");
            }
        }
        public Country EditCountry(int id, SimpleCountryDTO countryDTO)
        {
            try
            {
                var country = _db.Countries.Find(id);
                if (country == null)
                    throw new Exception($"Countrywith id {id} is not found");

                country.Name = countryDTO.Name;
                _db.SaveChanges();

                return country;
            }
            catch (Exception)
            {
                throw new Exception($"Error with edit country. Try again");
            }

        }
    }
}
