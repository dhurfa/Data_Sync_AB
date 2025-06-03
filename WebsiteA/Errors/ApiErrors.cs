using System.Text.Json;

namespace ProjectDataEntry.Errors
{
    public class ApiErrors
    {
        public ApiErrors(int errorCode, string errorMessage, string errorDetails)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
            ErrorDetails = errorDetails;
        }

        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }

        public override string ToString()
        {
           return JsonSerializer.Serialize(this);
        }


    }
}
