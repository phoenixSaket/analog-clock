import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  private http: HttpClient;
  url: string = "http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q="

  // http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}
  constructor(http: HttpClient) {
    this.http = http;
  }

  public getWeather(location: string): Observable<any> {
    location.length == 0 ? location = "paratwada" : location;
    return this.http.get(`${this.url}{${location}}`);
  }
}
