using DateEntryWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using ProjectDataEntry.Dto;

namespace ProjectDataEntry.Repository
{
    public interface IEntryRepository
    { 
        Entry GetEntry(string firstName);

        Entry AddEntry(Entry entry);

        Entry EditEntry(EditEntryDto entry);
    }
}
