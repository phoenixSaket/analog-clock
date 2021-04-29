import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  private http: HttpClient;
  url: string = "https://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=";
  forecastArray = [];
  city: string;
  country: string;

  // http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}
  constructor(http: HttpClient) {
    this.http = http;
  }

  public getWeather(location: string): Observable<any> {
    location ? location: location = "paratwada";
    return this.http.get(`${this.url}{${location}}`);
  }

  public setCity(city: string) {
    this.city = city;
  }

  public getCity() {
    return this.city;
  }

  public setCountry(country: string) {
    this.country = country;
    console.log("Country Set" , country)
  }

  public getCountry() {
    return this.country;
  }
  setForecastArray(array: any[], start) {
    this.forecastArray = [];
    let k = 0;

    while (k <= 5) {
      if (start + k <= 23) {
          this.forecastArray.push(array[start + k].temp_c);
          k++;
      } else {
        start = 0;
        k = 0;
      } 
    }
  }

  getForecastArray() {
    return this.forecastArray;
  }

}
