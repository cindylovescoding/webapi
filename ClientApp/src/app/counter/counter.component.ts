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
  public apiUrl: String = 'http://webapiapp.azurewebsites.net/';

  constructor(private route: ActivatedRoute, private location: Location, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Author[]>(this.apiUrl + 'api/authors').subscribe(result => {
      this.authors = result;
    }, error => console.error(error));
  }

}
