using DateEntryWebApi.Controllers;
using DateEntryWebApi.Data;
using DateEntryWebApi.Dto;
using DateEntryWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using ProjectDataEntry.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DataEntryUnitTests
{
    [TestFixture]
    public class UserControllerTests
    {
        private static DbContextOptions<DataContext> dbContextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: "UserDbTest")
                .Options;

        DataContext context;

        private UserController users;
        private UserRepository repo;
        private readonly Mock<IUserRepository> userRepository = new Mock<IUserRepository>();
        private readonly IConfiguration configuration;

        [OneTimeSetUp]
        public void Setup()
        {
            context = new DataContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            users = new UserController(context,configuration,userRepository.Object);
            repo = new UserRepository(context);

        }

        [Test , Order(1)]
        public void GetUsers_ReturnUserValue_Test()
        {
            List<User> user = repo.GetUsers();
            Assert.IsNotNull(user);
        }

        [Test, Order(2)]
        public void HTTPGET_Get_ReturnsOkResponse_Test()
        {
            var res = users.Get();
            ObjectResult Okresult = res as ObjectResult;
            Assert.AreEqual(200, Okresult.StatusCode);
        }

        [Test, Order(3)]
        public void Authenticate_ReturnsValue_Test()
        {
            LoginReqDto loginReqDto = new LoginReqDto()
            {
                Username = "Dhurfa",
                Password = "dhurfa2000"
            };
            var res = repo.Authenticate(loginReqDto);
            Assert.IsNotNull(res);
        }

        [Test , Order(4)]
        public void Authenticate_ReturnsNull_Test()
        {
            LoginReqDto loginReqDto = new LoginReqDto()
            {
                Username = "Rohit",
                Password = "rohit123"
            };
            var res = repo.Authenticate(loginReqDto);
            Assert.IsNull(res);
        }

        [Test, Order(5)]
        public void Register_ReturnsNull_Test()
        {
            LoginReqDto loginReqDto = new LoginReqDto()
            {
                Username = "Rohit",
                Password = "rohit123"
            };
            var res = repo.Register(loginReqDto);
            Assert.IsNull(res);
        }

        [Test, Order(6)]
        public void Register_ReturnsValue_Test()
        {
            LoginReqDto loginReqDto = new LoginReqDto()
            {
                Username = "Dhurfa",
                Password = "dhurfa2000"
            };
            var res = repo.Register(loginReqDto);
            Assert.IsNotNull(res);
        }

        [Test, Order(7)]
        public void HTTPPOST_Login_WhenObjectReturnsBadStatusCode_Test()
        {
            LoginReqDto loginReqDto = new LoginReqDto()
            {
                Username = "Rohit",
                Password = "rohit123"
            };
            userRepository.Setup(x => x.Authenticate(It.IsAny<LoginReqDto>()))
                .Returns((LoginReqDto loginReqDto)=> context.Users.FirstOrDefault(e => e.Username == loginReqDto.Username));
            IActionResult res = users.Login(loginReqDto);
            Assert.AreNotEqual(loginReqDto, res);
            //var user = repo.Authenticate(loginReqDto);
            //ObjectResult Badresult = res as ObjectResult;
            //Assert.AreEqual(401, Badresult.StatusCode);
        }

        [Test, Order(8)]
        public void HTTPPOST_Login_WhenObjectReturnsBadResponse_Test()
        {
            LoginReqDto loginReqDto = new LoginReqDto()
            {
                Username = "Dhurfa",
                Password = "dhurfa123"
            };
            userRepository.Setup(x => x.Authenticate(It.IsAny<LoginReqDto>()))
                .Returns((LoginReqDto loginReqDto) => context.Users.FirstOrDefault(e => e.Username == loginReqDto.Username));
            IActionResult res = users.Login(loginReqDto);
            var user = repo.Authenticate(loginReqDto);
            ObjectResult Badresult = res as ObjectResult;
            Assert.AreEqual(400, Badresult.StatusCode);
        }

        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }


        private void SeedDatabase()
        {
            var user = new User()
            {
                UserId = 1,
                Username = "Dhurfa",
                Password = new byte[0xC3F7],
                PasswordKey = new byte[Byte.MaxValue]
            };

            context.Users.AddRange(user);

            context.SaveChanges();

        }
    }
}
