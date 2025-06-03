using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebsiteB.Data;
using WebsiteB.Dto;
using WebsiteB.Models;
using WebsiteB.RepositoryInterface;

namespace WebsiteB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly IConfiguration configuration;
        private readonly IUserRepository repo;
        public UsersController(DataContext db, IConfiguration configuration, IUserRepository repo)
        {
            this._db = db;
            this.configuration = configuration;
            this.repo = repo;
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginReqDto loginReq)
        {
            var user = repo.Authenticate(loginReq);
            if (user == null || user.PasswordKey == null)
            {
                return StatusCode(401);
            }
            if (!MatchPasswordHash(loginReq.Password, user.Password, user.PasswordKey))
            {
                return BadRequest();
            }
            else
            {
                var loginRes = new LoginResDto();
                loginRes.Username = user.Username;
                loginRes.Token = CreateJWT(user);
                return Ok(loginRes);
            }
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(LoginReqDto loginReq)
        {
            var userEntry = repo.Register(loginReq);
            if (userEntry != null)
            {
                return BadRequest("User already exists, please try something else");
            }
            else
            {
                byte[] passwordHash, passwordkey;
                using (var hmac = new HMACSHA512())
                {
                    passwordkey = hmac.Key;
                    passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginReq.Password));
                }
                Users user = new Users();
                user.Username = loginReq.Username;
                user.Password = passwordHash;
                user.PasswordKey = passwordkey;

                _db.Users.Add(user);
                await _db.SaveChangesAsync();
                return StatusCode(200);
            }
        }
        private string CreateJWT(Users user)
        {
            var secretKey = configuration.GetSection("AppSettings:Key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));

                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i])
                        return false;
                }
                return true;
            }

        }
    }
}
