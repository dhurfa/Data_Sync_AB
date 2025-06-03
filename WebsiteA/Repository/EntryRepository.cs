using DateEntryWebApi.Data;
using DateEntryWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectDataEntry.Dto;

namespace ProjectDataEntry.Repository
{
    public class EntryRepository : IEntryRepository
    {
        private readonly DataContext db;
        public EntryRepository(DataContext db)
        {
            this.db = db;
        }

        public Entry AddEntry(Entry entry)
        {
            try
            {
                db.Entries.Add(entry);
                db.SaveChanges();
                return entry;
            }
            catch
            {
                return null;
            }
        }

        public Entry GetEntry(string firstName)
        {
            var ent = db.Entries.FirstOrDefault(e => e.FirstName == firstName);
            return ent;
        }

        public Entry EditEntry(EditEntryDto entry)
        {
            var ent = db.Entries.FirstOrDefault(e => e.FirstName == entry.FirstName);
            if(ent == null)
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
                return ent;
            }
        }
    }
}
