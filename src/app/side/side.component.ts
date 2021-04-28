import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherServiceService } from '../weather-service.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  @Input() name: string;
  @Input() avatar: string;
  @Input() city: any;
  @Output() settingsClick: EventEmitter<any> = new EventEmitter();
  message: string;
  progress: number;
  weatherData: any;
  weatherError: any;
  isForecast: boolean = false;
  forecast = [];
  type: string;
  data: {
    labels: any[]; datasets: {
      label: string;
      // data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55]
      data: any[];
      backgroundColor: string;
    }[];
  };
  hasWeatherData: boolean = false;
  options: { responsive: boolean; maintainAspectRatio: boolean; };

  constructor(private service: WeatherServiceService) { }

  ngOnInit(): void {
    this.getMessage(this);
  }

  getMessage(that) {

    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let upperLimit = 0;
    let lowerLimit = 0;


    if (hour > 5 && hour <= 10) { this.message = "Good Morning"; upperLimit = 10; lowerLimit = 5; }
    if (hour > 10 && hour < 16) { this.message = "Good Afternoon"; upperLimit = 16; lowerLimit = 10; }
    if (hour >= 16 && hour <= 20) { this.message = "Good Evening"; upperLimit = 20; lowerLimit = 16; }
    if (hour > 20 && hour <= 23) { this.message = "Good Night"; upperLimit = 32; lowerLimit = 20; }
    if (hour >= 0 && hour <= 5) { this.message = "Good Night"; upperLimit = 6; lowerLimit = 0; }

    let gap = upperLimit - lowerLimit;
    let ahead = ((hour - lowerLimit + (minute / 60)) / gap) * 100;
    this.progress = ahead;

    setTimeout(() => {
      this.getMessage(that);
    }, 10000)
  }

  settingsClicked() {
    this.settingsClick.emit(true);
  }




  getLabels() {
    let labels = [];
    let date = new Date();
    let start = date.getHours();
    let k = 0;

    while (k <= 5) {
      if (start + k <= 23) {
        if (start + k >= 12) {
          labels.push(start + k - 12 + "PM")
        } else {
          labels.push(start + k + "AM")
        }
      } else {
        start = 0;
        k = 0;
      }
      k++;
    }

    // for (let i = date.getHours() > 23 ? 0 : date.getHours(); i <= ((date.getHours() > 23) ? 12 : date.getHours() + 12); i++) {
    //   labels.push(i);
    // }
    return labels;
  }

  getForecastClick() {
    this.forecast = this.service.getForecastArray();
    this.isForecast = true;

    this.type = 'line';
    this.data = {
      labels: this.getLabels(),
      datasets: [
        {
          label: "Temperature (° C)",
          // data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55,65, 59, 80, 81, 56, 55]
          data: this.forecast,
          backgroundColor: "#3F51B575"
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  getCurrentTemp() {
    let data: any = this.service.getCurrentData();
    this.weatherData = data;
    this.hasWeatherData = true;
  }

}
