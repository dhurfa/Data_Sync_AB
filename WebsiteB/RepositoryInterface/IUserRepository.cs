using WebsiteB.Dto;
using WebsiteB.Models;

namespace WebsiteB.RepositoryInterface
{
    public interface IUserRepository
    {
        Users Authenticate(LoginReqDto loginReq);

        Users Register(LoginReqDto loginReq);

    }
}
