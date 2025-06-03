using Confluent.Kafka;
using Microsoft.Extensions.Options;
using WebsiteB.Data;
using WebsiteB.Dto;
using WebsiteB.Models;
using WebsiteB.RepositoryInterface;

namespace WebsiteB.Repository
{
    public class EntryRepository : IEntryRepository
    {
        private readonly DataContext _db;
        public EntryRepository(DataContext db)
        {
            this._db = db;
        }

        public Entry AddEntry(Entry entry)
        {
            try
            {
                _db.Entries.Add(entry);
                _db.SaveChanges();
                return entry;
            }
            catch
            {
                return null;
            }
        }

        public Entry GetEntry(string firstName)
        {
            var ent = _db.Entries.FirstOrDefault(e => e.FirstName == firstName);
            return ent;
        }

        public Entry EditEntry(UpdateEntryDto entry)
        {
            var ent = _db.Entries.FirstOrDefault(e => e.FirstName == entry.FirstName);
            if (ent == null)
            {
                return null;
            }
            else
            {
                ent.FirstName = entry.FirstName;
                ent.LastName = entry.LastName;
                ent.Admission = entry.Admission;
                ent.PracticingArea = entry.PracticingArea;
                ent.PracticeLocation = entry.PracticeLocation;
                _db.SaveChanges();
                return ent;
            }
        }
    }
}
