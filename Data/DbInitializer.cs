using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapiapp.Models;

namespace webapiapp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(BookServiceContext context)
        {
            context.Database.EnsureCreated();

            // Look for any authors.
            if (context.Authors.Any())
            {
                return;   // DB has been seeded
            }

            var authors = new Author[]
            {
                new Author() { Id = 1, Name = "Jane Austen" },
                new Author() { Id = 2, Name = "Charles Dickens" },
                new Author() { Id = 3, Name = "Miguel de Cervantes" }
            };
            foreach (Author a in authors)
            {
                context.Authors.Add(a);
            }
            context.SaveChanges();

            var books = new Book[]
            {
                new Book() { Id = 1, Title = "Pride and Prejudice", Year = 1813, AuthorId = 1,
                    Price = 9.99M, Genre = "Comedy of manners" },
                new Book() { Id = 2, Title = "Northanger Abbey", Year = 1817, AuthorId = 1,
                    Price = 12.95M, Genre = "Gothic parody" },
                new Book() { Id = 3, Title = "David Copperfield", Year = 1850, AuthorId = 2,
                    Price = 15, Genre = "Bildungsroman" },
                new Book() { Id = 4, Title = "Don Quixote", Year = 1617, AuthorId = 3,
                    Price = 8.95M, Genre = "Picaresque" }
            };
            foreach (Book b in books)
            {
                context.Books.Add(b);
            }
            context.SaveChanges();
        }
    }
}
