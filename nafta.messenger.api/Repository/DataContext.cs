using Microsoft.EntityFrameworkCore;
using Nafta.Messenger.Api.Repository.Models;

namespace Nafta.Messenger.Api.Repository
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Message> Messages { get; set; }

        public DbSet<User> Users { get; set; }
    }
}