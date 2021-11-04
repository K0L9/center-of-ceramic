using CenterOfCeramic.Data;
using CenterOfCeramic.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options => options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "client-app/multikart_react_all_in_one";
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CenterOfCeramic", Version = "v1" });
            });

            services.AddTransient<CategoryService>();
            services.AddTransient<ProductService>();
            services.AddTransient<CountryService>();

            services.AddControllersWithViews(options => options.EnableEndpointRouting = false)
                .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddMvc(x => x.EnableEndpointRouting = false);
            services.AddControllers(options => options.EnableEndpointRouting = false);
            services.AddRazorPages().AddMvcOptions(options => options.EnableEndpointRouting = false);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "CenterOfCeramic v1"));
            }

            app.UseSpaStaticFiles();

            app.UseHttpsRedirection();

            app.UseMvc();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //UseUserPage(app);
            app.Map("/admin", false, UseUserPage );
            //app.Map("/user", UseAdminPage);

        }
        private void UseAdminPage(IApplicationBuilder app)
        {
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client-app/multikart_react_all_in_one/backend";
                //spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
                //{
                //    OnPrepareResponse = context =>
                //    {
                //        if (context.File.Name == "index.html")
                //        {
                //            context.Context.Response.Headers
                //                .Add("Cache-Control", "no-cache, no-store, must-revalidate");
                //            context.Context.Response.Headers.Add("Pragma", "no-cache");
                //            context.Context.Response.Headers.Add("Expires", "0");
                //        }
                //    }
                //};
                spa.UseReactDevelopmentServer(npmScript: "start");
            });
        }
        private void UseUserPage(IApplicationBuilder app)
        {
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client-app/multikart_react_all_in_one/frontend";
                //spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions
                //{
                //    OnPrepareResponse = context =>
                //    {
                //        if (context.File.Name == "index.html")
                //        {
                //            context.Context.Response.Headers
                //                .Add("Cache-Control", "no-cache, no-store, must-revalidate");
                //            context.Context.Response.Headers.Add("Pragma", "no-cache");
                //            context.Context.Response.Headers.Add("Expires", "0");
                //        }
                //    }
                //};
                spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
            });
        }
    }
}
