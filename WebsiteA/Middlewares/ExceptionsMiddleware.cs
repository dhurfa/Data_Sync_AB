using ProjectDataEntry.Errors;
using System.Net;

namespace ProjectDataEntry.Middlewares
{
    public class ExceptionsMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionsMiddleware> logger;

        public ExceptionsMiddleware(RequestDelegate next, ILogger<ExceptionsMiddleware> logger)
        {
            this.next = next;
            this.logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch(Exception ex)
            {
                ApiErrors response;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                string message;
                var exceptionType = ex.GetType();

                if(exceptionType == typeof(UnauthorizedAccessException))
                {
                    statusCode = HttpStatusCode.Unauthorized;
                    message = "You are not authorized";
                }
                else if (exceptionType == typeof(NullReferenceException))
                {
                    statusCode = HttpStatusCode.NotFound;
                    message = ex.Message;
                }
                else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Server error";
                }
                response = new ApiErrors((int)statusCode, message, ex.StackTrace.ToString());
                logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(response.ToString()); 
            }
        }
    }
}
