import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../fetch-data/fetch-data.component';
import { Observable } from 'rxjs/Observable';

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
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
  }

  save(): void {
    this.updateBook(this.book);
  }

  /** PUT: update the hero on the server */
  updateBook(book: Book): Observable<any> {
    const id = book.id;
    const urlPrefix = this.baseUrl + 'api/books';
    const url = `${urlPrefix}/${id}`;
   // return this.http.put(this.baseUrl + 'api/books/' + id, book, httpOptions);
    return this.http.put(url, book, httpOptions);
  }

}
