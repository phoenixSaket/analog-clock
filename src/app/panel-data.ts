import { CovidService } from "./covid.service";
import { WeatherServiceService } from "./weather-service.service";

export class PanelData {

    weather: WeatherServiceService;
    covid: CovidService;

    weatherData: any;
    covidData: any;
    data: any;

    constructor(weather: WeatherServiceService, covid: CovidService) {
        this.weather = weather;
        this.covid = covid;
        // this.setPanelData();
        this.inputData();
    }

    inputData() {
        this.data = [
            {
                title: "Weather",
                type: "weather",
            },
            {
                title: "Forecast",
                type: "forecast",
            },
            {
                title: "Covid",
                type: "covid",
            },
            {
                title: "Quote Of the Day",
                type: "quote"
            }
        ]

    }

    getPanelData() {
        return this.data;
    }

    setPanelData() {
        this.weather.getWeather(this.weather.getCity()).subscribe(
            (data) => {
               
                this.weatherData = data;
            },
            (error) => {
                console.error("ËRROR", error);
            }
        )

        this.covid.getCovidData().subscribe(
            (data) => {
                this.covidData = data;
            },
            (error) => {
                console.error("ËRROR", error);
            }
        )

    }


}