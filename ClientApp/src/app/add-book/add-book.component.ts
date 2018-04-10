import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, Author } from '../fetch-data/fetch-data.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  public authors: Author[];
  public newBookAuthorId : number=1;

  constructor(private route: ActivatedRoute, private location: Location, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Author[]>(baseUrl + 'api/authors').subscribe(result => {
      this.authors = result;
    }, error => console.error(error));
  }

  ngOnInit() {
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
    const urlPrefix = this.baseUrl + 'api/books';
    // const url = `${urlPrefix}/${id}`;
    this.http.post(urlPrefix, book, httpOptions).subscribe(result => {
      alert("Added book successfully!");
    }, error => console.error(error));
  }


  goBack(): void {
    this.location.back();
  }
}
