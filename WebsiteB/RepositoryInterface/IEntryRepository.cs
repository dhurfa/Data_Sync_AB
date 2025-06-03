using WebsiteB.Dto;
using WebsiteB.Models;

namespace WebsiteB.RepositoryInterface
{
    public interface IEntryRepository
    {
        Entry GetEntry(string firstName);
        Entry AddEntry(Entry entry);
        Entry EditEntry(UpdateEntryDto entry);
    }
}
