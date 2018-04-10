using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapiapp.Data;
using webapiapp.Models;

namespace webapiapp.Controllers
{
    [Produces("application/json")]
    [Route("api/Books")]
    public class BooksController : Controller
    {
        private readonly BookServiceContext _context;

        public BooksController(BookServiceContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        //public IEnumerable<Book> GetBooks()
        //{
        //    return _context.Books;
        //}
        public IQueryable<BookDetailDTO> GetBooks()
        {
            //var bookServiceContext =  _context.Books.Include(b => b.Author);
            //return bookServiceContext;

            var books = from b in _context.Books
                        select new BookDetailDTO()
                        {
                            Id = b.Id,
                            Title = b.Title,
                            Year = b.Year,
                            Price = b.Price,
                            AuthorName = b.Author.Name,
                            Genre = b.Genre,
                            AuthorId = b.Author.Id
                        };

            return books;
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Include() Join table first
            // Select() create and return new Data Structures.
            var book = await _context.Books.Include(b => b.Author).Select(b =>
                           new BookDetailDTO()
                           {
                               Id = b.Id,
                               Title = b.Title,
                               Year = b.Year,
                               Price = b.Price,
                               AuthorName = b.Author.Name,
                               Genre = b.Genre
                           }).SingleOrDefaultAsync(b => b.Id == id);


            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook([FromRoute] int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        [HttpPost]
        public async Task<IActionResult> PostBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // This is not working
             _context.Books.Add(book);
            // _context.Add(book);
            await _context.SaveChangesAsync();

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateException)
            //{
            //    if (BookExists(book.Id))
            //    {
            //        return new StatusCodeResult(StatusCodes.Status409Conflict);
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            _context.Entry(book).Reference(x => x.Author).Load();

            var dto = new BookDTO()
            {
                Id = book.Id,
                Title = book.Title,
        //        AuthorName = book.Author.Name
            };

            return Ok(dto);
        //    return CreatedAtRoute("DefaultApi", new { id = book.Id }, dto);
        //    return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var book = await _context.Books.SingleOrDefaultAsync(m => m.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return Ok(book);
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}