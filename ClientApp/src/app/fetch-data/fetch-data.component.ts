import { Component, Inject, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  public books: Book[];
  public selectedBook: Book;
  public authors: Author[];
  public toAddBook: Boolean = false;
  @Input() newBook: Book;
  public newBookAuthorId: number;
  public idCount: number;
  public selectedAuthorId: number;
  public apiUrl: String = 'http://webapiapp.azurewebsites.net/';
  @Input() book: Book;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<WeatherForecast[]>(this.apiUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
    http.get<Book[]>(this.apiUrl + 'api/books').subscribe(result => {
      this.books = result; this.idCount = this.books.length;
    }, error => console.error(error));
    http.get<Author[]>(this.apiUrl + 'api/authors').subscribe(result => {
      this.authors = result;
    }, error => console.error(error));
  }

  onSelect(book: Book): void {
    this.selectedBook = book;
    this.book = book;
  }

  add(): void {
    this.toAddBook = true;
  }

  submit(): void {
    this.toAddBook = true;
  }

  addBook(title: String, year: number, genre: String, price: number, authorId: number) {
   // this.idCount = this.idCount + 1;
    var book = {
      //  id: price,
    //  id: this.idCount,
   //   authorId: year,
      title: title,
      year: year,
      genre: genre,
      price: price,
      authorId: authorId
    } as Book;
   // const id = book.id;
    // alert(this.http == null ? "null" : "notnull");
    const urlPrefix = this.apiUrl + 'api/books';
   // const url = `${urlPrefix}/${id}`;
    this.http.post(urlPrefix, book, httpOptions).subscribe(result => {
      alert("Added book successfully!"); result => this.books.push(book);
    }, error => console.error(error));
  }

  save(): void {
    this.updateBook(this.book);
  }


  /** PUT: update the book on the server */
  updateBook(book: Book) {
    const id = book.id;
   // alert(this.http == null ? "null" : "notnull");
    const urlPrefix = this.apiUrl + 'api/books';
    const url = `${urlPrefix}/${id}`;
    //this.http.get(url).subscribe(result => {
    //  alert(result.toString());
    //}, error => console.error(error));
    //this.http.put(url, book, httpOptions).subscribe(result => {
    //  console.log(result);
    //}, error => console.error(error));
    var newBook1 = {
      //  id: price,
      //  id: this.idCount,
      //   authorId: year,
      id: book.id,
      title: book.title,
      year: book.year,
      price: book.price,
      genre: book.genre,
      authorId: book.authorId,
   //   authorName: book.authorName
    };
    this.http.put(url, newBook1, httpOptions).subscribe(result => {
      alert("Updated book detail successfully!");
    }, error => console.error(error));
   // return this.http.put(urlPrefix, book, httpOptions).map((res: Response) => res.json()) 
      //pipe(console.error());
   // return this.http.put(urlPrefix, book);
  }


}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export interface Book {
  id: number;
  title: string;
  year: number;
  price: number;
  genre: string;
  // author: Author;
  authorName: string;
  authorId: number;
        //Navigation Property
     //   public Author Author { get; set; }
}


export interface Author {
  id: number;
  name: string;
  books: Array<Book>;
}
