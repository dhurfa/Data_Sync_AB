using Confluent.Kafka;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Text.Json;
using WebsiteB.Data;
using WebsiteB.Dto;
using WebsiteB.Models;
using WebsiteB.RepositoryInterface;

namespace WebsiteB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly IEntryRepository repo;
        public EntryController(DataContext db, IEntryRepository repo)
        {
            this._db = db;
            this.repo = repo;
        }

        [HttpGet("{FirstName}")]
        public IActionResult Get([FromRoute] string FirstName)
        {
            var ent = repo.GetEntry(FirstName);
            if (ent == null)
            {
                return BadRequest(string.Format("No Entry found with FirstName = {0}", FirstName));
            }
            return Ok(ent);
        }

        [HttpPost]
        [Route("Create")]
        public IActionResult Post([FromBody] Entry entry)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var ent = repo.GetEntry(entry.FirstName);
                    if (ent != null)
                    {
                        return BadRequest(string.Format("Entry already exists"));
                    }
                    var res = repo.AddEntry(entry);
                    if (res != null)
                        return StatusCode(200);
                    else
                        return StatusCode(400);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("Edit")]
        public IActionResult Put([FromBody] UpdateEntryDto entry)
        {
            var ent = repo.EditEntry(entry);
            if (ent == null)
            {
                return BadRequest(string.Format("Cannot be updated. Check details"));
            }
            return StatusCode(200);
        }
    }

}
