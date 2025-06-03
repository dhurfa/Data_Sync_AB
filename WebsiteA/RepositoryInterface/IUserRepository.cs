using DateEntryWebApi.Dto;
using DateEntryWebApi.Models;

namespace ProjectDataEntry.Repository
{
    public interface IUserRepository
    {
        List<User> GetUsers();

        User Authenticate(DtoLoginReq loginReq);

        User Register(DtoLoginReq loginReq);

    }
}
