using DateEntryWebApi.Controllers;
using DateEntryWebApi.Data;
using DateEntryWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Moq;
using ProjectDataEntry.Dto;
using ProjectDataEntry.Repository;
using System.IO.Pipelines;

namespace DataEntryUnitTests
{
    [TestFixture]
    public class EntryControllerTests
    {
        private static DbContextOptions<DataContext> dbContextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName : "EntryDbTest")
                .Options;

        DataContext context;

        private EntryController entries;
        private EntryRepository repo;
        private readonly Mock<IEntryRepository> entryRepository = new Mock<IEntryRepository>();  
      
        [OneTimeSetUp]
        public void Setup()
        {
            context = new DataContext(dbContextOptions);
            context.Database.EnsureCreated();

            SeedDatabase();

            entries = new EntryController(context, entryRepository.Object);
            repo = new EntryRepository(context);
        }

        [Test , Order(1)]
        public void GetEntry_WhenObjectReturnsValue_Test()
        {
            entryRepository.Setup(x => x.GetEntry(It.IsAny<string>()))
                .Returns((string firstName) => context.Entries.FirstOrDefault(e => e.FirstName == firstName));
            var result = repo.GetEntry("Dhurfa");
            Assert.That(result.LastName, Is.EqualTo("Najima"));
            Assert.That(result.Position, Is.EqualTo("Senior Analyst"));
        }

        [Test , Order(2)]
        public void GetEntry_WhenObjectReturnsNull_Test()
        {
            var result = repo.GetEntry("Rohit");
            Assert.That(result, Is.Null);
        }

        [Test , Order(3)]
        public void HTTPGET_Get_WhenObjectReturnsOKStatusCode_Test()
        {
            IActionResult res = entries.Get("Dhurfa");
            ObjectResult Okresult = res as ObjectResult;
            Assert.AreEqual(200, Okresult.StatusCode);
            var actionResultData = (res as OkObjectResult).Value as Entry;
            Assert.That(actionResultData.LastName, Is.EqualTo("Najima"));
        }

        [Test , Order(4)]
        public void HTTPGET_Get_WhenObjectReturnsBadResponse_Test()
        {
            IActionResult res = entries.Get("Rohit");
            ObjectResult Badresult = res as ObjectResult;
            Assert.AreEqual(400, Badresult.StatusCode);
        }

        [Test, Order(5)]
        public void HTTPPOST_POST_WhenObjectReturnsOkResponse_Test()
        {
            var newEntry = new Entry()
            {
                Id = 2,
                FirstName = "Gayathri",
                LastName = "Ravindran",
                Email = "gaayu@gmail.com",
                Born = new DateTime(1990, 9, 11, 5, 38, 46),
                Admission = new DateTime(1990, 10, 14, 8, 13, 29),
                PracticingArea = "Guindy",
                PracticeLocation = "Chennai",
                Position = "Senior Analyst"
            };
            entryRepository.Setup(x => x.GetEntry(It.IsAny<string>()))
                .Returns((string firstName) => context.Entries.FirstOrDefault(e => e.FirstName == firstName));
            var ent = repo.GetEntry(newEntry.FirstName);
            entryRepository.Setup(x => x.AddEntry(It.IsAny<Entry>())).Returns(newEntry);
            var Ok = repo.AddEntry(newEntry);
            IActionResult res = entries.Post(newEntry);
            Assert.That(Ok, Is.Not.Null);
        }

        [Test, Order(6)]
        public void AddEntry_WhenObjectReturnsResponse_Test()
        {
            var newEntry = new Entry()
            {
                Id = 3,
                FirstName = "Aruna",
                LastName = "Sekar",
                Email = "arunas@gmail.com",
                Born = new DateTime(1990, 9, 11, 5, 38, 46),
                Admission = new DateTime(1990, 10, 14, 8, 13, 29),
                PracticingArea = "Guindy",
                PracticeLocation = "Chennai",
                Position = "Senior Analyst"
            };
            var res = repo.AddEntry(newEntry);
            Assert.That(res, Is.Not.Null);
        }

        [Test, Order(7)]
        public void HTTPPOST_POST_WhenObjectReturnsBadResponse_Test()
        {
            var newEntry = new Entry()
            {
                FirstName = "Rohit"
            };
            entryRepository.Setup(x => x.GetEntry(It.IsAny<string>()))
                .Returns((string firstName) => context.Entries.FirstOrDefault(e => e.FirstName == firstName));
            var ent = repo.GetEntry(newEntry.FirstName);
            entryRepository.Setup(x => x.AddEntry(It.IsAny<Entry>())).Returns(newEntry);
            var BadReq = repo.AddEntry(newEntry);
            var res = entries.Post(newEntry);
            Assert.That(BadReq, Is.Null);
        }

        [Test, Order(8)]
        public void AddEntry_WhenObjectReturnsNull_Test()
        {
            var newEntry = new Entry()
            {
                FirstName = "Rohit"
            };
            var BadReq = repo.AddEntry(newEntry);
            Assert.That(BadReq, Is.Null);
        }

        [Test, Order(9)]
        public void HTTPPUT_PUT_WhenObjectReturnsBadRequest_Test()
        {
            var entryDto = new EditEntryDto()
            {
                FirstName = "Rohit"
            };
            var res = entries.Put(entryDto);
            Assert.That(res, Is.TypeOf<BadRequestObjectResult>());
        }

        [Test, Order(10)]
        public void HTTPPUT_PUT_WhenObjectReturnsOkResponse_Test()
        {
            var entryDto = new EditEntryDto()
            {
                FirstName = "Dhurfa",
                LastName = "Najima",
                Admission = new DateTime(1990, 10, 14, 8, 13, 29),
                PracticingArea = "Guindy",
                PracticeLocation = "Chennai"
            };
            entryRepository.Setup(x => x.EditEntry(It.IsAny<EditEntryDto>()));
            var result = repo.EditEntry(entryDto);
            IActionResult res = entries.Put(entryDto);
            Assert.That(result , Is.Not.Null);
        }

        [Test, Order(11)]
        public void EditEntry_WhenObjectReturnsResponse_Test()
        {
            var entryDto = new EditEntryDto()
            {
                FirstName = "Dhurfa",
                LastName = "Musthafa",
                Admission = new DateTime(1990, 10, 14, 8, 13, 29),
                PracticingArea = "Guindy",
                PracticeLocation = "Chennai",
            };
            var res = repo.EditEntry(entryDto);
            Assert.That(res.LastName, Is.EqualTo("Musthafa"));
            Assert.That(res.PracticingArea, Is.EqualTo("Guindy"));
        }

        [Test, Order(12)]
        public void HTTPGET_Get_RecheckWhenObjectReturnsOKStatusCode_Test()
        {
            IActionResult res = entries.Get("Dhurfa");
            var actionResultData = (res as OkObjectResult).Value as Entry;
            Assert.That(actionResultData.LastName, Is.EqualTo("Musthafa"));
        }

        [Test, Order(13)]
        public void EditEntry_WhenObjectReturnsNull_Test()
        {
            var entryDto = new EditEntryDto()
            {
                FirstName = "Rohit",
                LastName = "Saraf"
            };
            var res = repo.EditEntry(entryDto);
            Assert.That(res, Is.Null);
        }


        [OneTimeTearDown]
        public void CleanUp()
        {
            context.Database.EnsureDeleted();
        }


        private void SeedDatabase()
        {
            var entry = new Entry()
            {
                Id = 1,
                FirstName = "Dhurfa",
                LastName = "Najima",
                Email = "dhurfas@gmail.com",
                Born = new DateTime(1990, 9, 11, 5, 38, 46),
                Admission = new DateTime(1990, 10, 14, 8, 13, 29),
                PracticingArea = "Velachery",
                PracticeLocation = "Chennai",
                Position = "Senior Analyst"
            };
            context.Entries.AddRange(entry);

            context.SaveChanges();
        }

        
    }
}