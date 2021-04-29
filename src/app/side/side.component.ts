import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CovidService } from '../covid.service';
import { PanelData } from '../panel-data';
import { QuotesService } from '../quotes.service';
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
  @Input() settingClicked: boolean;
  @Output() settingsClick: EventEmitter<any> = new EventEmitter();
  message: string;
  progress: number;
  weatherData: any;
  weatherError: any;
  isForecast: boolean = false;
  forecast = [];
  type: string;
  weatherDiv: HTMLElement = document.getElementById("weather");
  forecastDiv: HTMLElement = document.getElementById("forecast");
  covidDiv: HTMLElement = document.getElementById("covid");
  quoteData: any;

  arrayDiv = [this.weatherDiv, this.forecastDiv ,this.covidDiv ];

  data: {
    labels: any[]; datasets: {
      label: string;
      data: any[];
      backgroundColor: string;
    }[];
  };
  hasWeatherData: boolean = false;
  options: { responsive: boolean; maintainAspectRatio: boolean; };
  covidData: any;
  panelData: any;

  constructor(private service: WeatherServiceService, private covid: CovidService,private quote: QuotesService) { }

  ngOnInit(): void {
    this.getMessage(this);
    this.getWeatherData();
    this.getCovidData();
    this.getQuote();
    let panel : PanelData = new PanelData(this.service, this.covid);
    this.panelData = panel.getPanelData();
  }

  getWeatherData() {
    this.service.getWeather(this.service.getCity()).subscribe(
      (data) => {
        this.weatherData = data;
        this.hasWeatherData = true;
        this.getForecastData();
      },
      (error) => {
        this.hasWeatherData = false;
        console.error("ERROR : ", error);
      }
    )
  }

  getForecastData() {
    this.service.setForecastArray(this.weatherData?.forecast?.forecastday[0]?.hour, new Date().getHours());
    this.getForecastClick();
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
    this.settingClicked = !this.settingClicked;
    this.settingsClick.emit(true);
  }

  getLabels() {
    let labels = [];
    let date = new Date();
    let start = date.getHours();
    let k = 0;

    while (k <= 5) {
      if (start + k <= 23) {
        if (start + k == 0) {
          labels.push(12 + "AM")
        }
        else {
          if (start + k >= 12) {
            labels.push(start + k - 12 + "PM")
          } else {
            labels.push(start + k + "AM")
          }
        }
      } else {
        start = 0;
        k = 0;
      }
      k++;
    }

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

  getCovidData() {
    this.covid.getCovidData().subscribe(
      (data) => {
        this.covidData = data;
      }, (error) => { console.error(error); }
    )
  }

  drop(event) {
    moveItemInArray(this.panelData, event.previousIndex, event.currentIndex);
  }

  getQuote() {
    
      let quote = {};
      let length = 0;
      let random = Math.random();
      this.quote.getQuotes().subscribe(
        (data)=>{
          length = data.length;
          let pos = Math.round(length * random);
          this.quoteData = data[pos];
        },
        (error)=>{
          console.error("ERROR : ",error);
        }
      )
    
  }
}
