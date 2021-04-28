import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private http: HttpClient;
  url: string = "https://corona.lmao.ninja/v3/covid-19/countries/India";

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCovidData(): Observable<any> {
    return this.http.get(this.url);
  }
}
