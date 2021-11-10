using AutoMapper;
using CenterOfCeramic.Data;
using CenterOfCeramic.Models;
using CenterOfCeramic.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic.Services
{
    public class ReviewService
    {
        private AppDbContext _db;
        private Mapper mapper;
        public ReviewService(AppDbContext db)
        {
            _db = db;

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Review, ReviewDTO>();
                cfg.CreateMap<ReviewDTO, Review>();
            });
            mapper = new Mapper(config);
        }
        public Review AddReview(ReviewDTO reviewDTO)
        {
            try
            {
                var review = mapper.Map<Review>(reviewDTO);
                var result = _db.Reviews.Add(review);
                _db.SaveChanges();
                return result.Entity;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
