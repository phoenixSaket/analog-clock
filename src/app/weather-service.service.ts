import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  private http: HttpClient;
  url: string = "https://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q="
  forecastArray = [];

  // http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}
  constructor(http: HttpClient) {
    this.http = http;
  }

  public getWeather(location: string): Observable<any> {
    location.length == 0 ? location = "paratwada" : location;
    return this.http.get(`${this.url}{${location}}`);
  }

  setForecastArray(array: any[]) {

    for(let i = 9 ; i < 21; i++) {
      this.forecastArray.push(array[i].temp_c);
    }
    console.log(this.forecastArray);
  }

  getForecastArray() {
    return this.forecastArray;
  }
}
