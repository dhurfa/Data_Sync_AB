using DateEntryWebApi.Data;
using DateEntryWebApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ProjectDataEntry.Dto;
using ProjectDataEntry.Repository;
using System.Drawing.Text;
using System.Net;
using Confluent.Kafka;
using Microsoft.Extensions.Options;

namespace DateEntryWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntryController : ControllerBase
    {
        private readonly DataContext _db;
        private readonly IEntryRepository repo;
        private readonly ProducerConfig _config;
        private readonly string topic = "entry";
        //private readonly DataContext context;
        //private readonly ProducerConfig config;

        public EntryController(DataContext db, IEntryRepository repo , IOptions<ProducerConfig> config)
        {
            this._db = db;
            this.repo = repo;
            _config = config.Value;
        }

        /*
        public EntryController(DataContext context, IEntryRepository repo, ProducerConfig config)
        {
            this.context = context;
            this.repo = repo;
            this.config = config;
        }

        */


        [HttpGet("{firstName}")]
        public IActionResult Get([FromRoute] string firstName)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var ent = repo.GetEntry(firstName);
                    if (ent == null)
                    {
                        return BadRequest(string.Format("No Entry found with FirstName = {0}", firstName));
                    }
                    return Ok(ent);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Post([FromBody] Entry entry)
        {
            try
            {
                if (ModelState.IsValid) {
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
        [Route("edit")]
        public async Task<IActionResult> Put([FromBody] EditEntryDto entry)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var ent = repo.EditEntry(entry);
                    if (ent == null)
                    {
                        return BadRequest(string.Format("Cannot be updated. Check details"));
                    }
                    _db.SaveChanges();

                    string message = JsonConvert.SerializeObject(entry);
                    return Ok(SendToKafka(topic, message));
                    return StatusCode(200);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private Object SendToKafka(string topic, string message)
        {
            var producer = new ProducerBuilder<string, string>(_config)
                                   .SetKeySerializer(Serializers.Utf8)
                                   .SetValueSerializer(Serializers.Utf8)
                                   .Build();
            try { 
                return producer.ProduceAsync(topic,
                  new Message<string, string> {
                      Key = Guid.NewGuid().ToString(),
                      Value = message
                    })
                    .GetAwaiter()
                    .GetResult();
                    //producer.Flush(TimeSpan.FromSeconds(10));
            }
            catch (Exception e)
            {
               Console.WriteLine($"Oops, something went wrong: {e}");
            }
            return null;
        }
          
    }


}