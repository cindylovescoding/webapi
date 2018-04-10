import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, Author } from '../fetch-data/fetch-data.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  public authors: Author[];
  public apiUrl: String = 'http://webapiapp.azurewebsites.net/';

  constructor(private route:ActivatedRoute, private location: Location, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Author[]>(this.apiUrl + 'api/authors').subscribe(result => {
      this.authors = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const urlPrefix = this.apiUrl + 'api/books';
    const url = `${urlPrefix}/${id}`;
    this.http.get<Book>(url).subscribe(result => {
      this.book = result;
    }, error => console.error(error));
  }

  save(): void {
    this.updateBook(this.book);
  }

  goBack(): void {
    this.location.back();
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
