using DateEntryWebApi.Data;
using DateEntryWebApi.Dto;
using DateEntryWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ProjectDataEntry.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext db;
        public UserRepository(DataContext db)
        {
            this.db = db;
        }
        public User Authenticate(DtoLoginReq loginReq)
        {
            return db.Users.FirstOrDefault(x => x.Username == loginReq.Username);
        }

        public List<User> GetUsers()
        {
            List<User> user = db.Users.ToList();
            return user;
        }

        public User Register(DtoLoginReq loginReq)
        {
            return db.Users.FirstOrDefault(x => x.Username == loginReq.Username);
        }
    }
}
