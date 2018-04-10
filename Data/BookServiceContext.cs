using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using webapiapp.Models;
using Microsoft.EntityFrameworkCore;

namespace webapiapp.Data
{
    public class BookServiceContext : DbContext
    {
        public BookServiceContext(DbContextOptions<BookServiceContext> options) : base(options)
        {
        }

        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>().ToTable("Author");
            modelBuilder.Entity<Book>().ToTable("Book");
        }
    }
}
