using Microsoft.AspNetCore.Diagnostics;
using ProjectDataEntry.Middlewares;
using System.Net;

namespace ProjectDataEntry.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionsMiddleware>();
        }
        public static void ConfigureBuiltInExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(
                options =>
                {
                   options.Run(
                      async context =>
                      {
                         context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                         var ex = context.Features.Get<IExceptionHandlerFeature>();
                         if (ex != null)
                         {
                            await context.Response.WriteAsync(ex.Error.Message);
                         }
                      });
                }
           );
        }
    }
}
