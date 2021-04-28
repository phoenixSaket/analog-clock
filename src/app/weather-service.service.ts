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
  currentData = {
    "condition": {}, "temp": "", "feelsLike" : "", "location": { "country": "", "region": "", "name": "" }
  };

  // http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}
  constructor(http: HttpClient) {
    this.http = http;
  }

  public getWeather(location: string): Observable<any> {
    location.length == 0 ? location = "paratwada" : location;
    return this.http.get(`${this.url}{${location}}`);
  }

  setForecastArray(array: any[], start) {

    console.log(start);
    let k = 0;

    while (k <= 5) {
      if (start + k <= 23) {
          this.forecastArray.push(array[start + k].temp_c);
      } else {
        start = 0;
        k = 0;
      }
      k++;
    }

  }

  getForecastArray() {
    return this.forecastArray;
  }

  setCurrentData(data: { condition: any; temp: string; feelsLike : string ,location: { country: string; region: string; name: string; }; }) {
    this.currentData.condition = data.condition;
    this.currentData.temp = data.temp;
    this.currentData.location = data.location;
    this.currentData.feelsLike = data.feelsLike;
    console.log(this.currentData);
  }

  getCurrentData() {
    return this.currentData;
  }
}
