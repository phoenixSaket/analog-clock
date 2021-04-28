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

  constructor(private service: WeatherServiceService) { }

  ngOnInit(): void {

    this.service.getWeather(this.city).subscribe(
      (data: any) => {
        this.weatherData = data;
      },
      (error: any) => {

      }
    )
    this.getMessage(this);
  }

  getMessage(that) {

    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let upperLimit = 0;
    let lowerLimit = 0;


    if (hour > 3 && hour <= 9) { this.message = "Good Morning"; upperLimit = 9; lowerLimit = 3; }
    if (hour > 9 && hour < 16) { this.message = "Good Afternoon"; upperLimit = 16; lowerLimit = 9; }
    if (hour >= 16 && hour <= 20) { this.message = "Good Evening"; upperLimit = 20; lowerLimit = 16; }
    if (hour > 20 && hour <= 23) { this.message = "Good Night"; upperLimit = 26; lowerLimit = 20; }
    if (hour >= 0 && hour <= 3) { this.message = "Good Night"; upperLimit = 6; lowerLimit = 0; }

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

}
