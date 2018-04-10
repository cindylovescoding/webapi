import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, Author } from '../fetch-data/fetch-data.component';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public authors: Author[];

  constructor(private route: ActivatedRoute, private location: Location, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Author[]>(baseUrl + 'api/authors').subscribe(result => {
      this.authors = result;
    }, error => console.error(error));
  }

}
