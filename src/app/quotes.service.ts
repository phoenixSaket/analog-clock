import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private http: HttpClient;
  url: string = "https://type.fit/api/quotes";

  constructor(http: HttpClient) { 
    this.http = http;
  }

  getQuotes():Observable<any> {
    return this.http.get(this.url);
  }

  
}
