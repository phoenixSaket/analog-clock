import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherServiceService } from './weather-service.service';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private http: HttpClient;
  url: string = "https://corona.lmao.ninja/v3/covid-19/countries/";
  country: string;

  constructor(http: HttpClient, private service: WeatherServiceService) {
    this.http = http;
    this.country = this.service.getCountry();
  }

  getCovidData(): Observable<any> {
    this.country = this.service.getCountry();
    console.log("Country",this.country);
    if(!this.country) {
      this.country = "India";
    }
    return this.http.get(this.url+this.country);
  }
}
