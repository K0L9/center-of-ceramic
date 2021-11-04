using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenterOfCeramic
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ApiKeyValidatorsMiddleware
    {
        private readonly RequestDelegate _next;

        public ApiKeyValidatorsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                if (httpContext.Request.Path.StartsWithSegments("/api"))
                {

                    var queryString = httpContext.Request.Query;
                    StringValues keyvalue;
                    queryString.TryGetValue("key", out keyvalue);



                    if (httpContext.Request.Method != "POST")
                    {
                        httpContext.Response.StatusCode = 405; //Method Not Allowed               
                        await httpContext.Response.WriteAsync("Method Not Allowed");
                        return;
                    }

                    if (keyvalue.Count == 0)
                    {
                        httpContext.Response.StatusCode = 400; //Bad Request                
                        await httpContext.Response.WriteAsync("API Key is missing");
                        return;
                    }
                    else
                    {
                        var serviceName = httpContext.Request.Path.Value.Replace(@"/", string.Empty);


                            httpContext.Response.StatusCode = 401; //UnAuthorized
                            await httpContext.Response.WriteAsync("Invalid User Key");
                            return;
                    }

                }
                await _next.Invoke(httpContext);

            }
            catch (Exception)
            {
                throw;
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ApiKeyValidatorsMiddleware>();
        }
    }
}
