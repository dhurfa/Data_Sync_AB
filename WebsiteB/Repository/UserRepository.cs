using WebsiteB.Data;
using WebsiteB.Dto;
using WebsiteB.Models;
using WebsiteB.RepositoryInterface;

namespace WebsiteB.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext db;
        public UserRepository(DataContext db)
        {
            this.db = db;
        }
        public Users Authenticate(LoginReqDto loginReq)
        {
            return db.Users.FirstOrDefault(x => x.Username == loginReq.Username);
        }

        public Users Register(LoginReqDto loginReq)
        {
            return db.Users.FirstOrDefault(x => x.Username == loginReq.Username);
        }
    }
}
