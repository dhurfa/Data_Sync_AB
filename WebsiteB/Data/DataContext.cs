using Microsoft.EntityFrameworkCore;
using WebsiteB.Models;

namespace WebsiteB.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Entry> Entries { get; set; }
        public DbSet<Users> Users { get; set; }



    }
}
