import { Component } from '@angular/core';
import { WeatherServiceService } from './weather-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'analog-clock';
  images = [];
  avatars = [
    "assets/Avatars/avatar-0.png",
    "assets/Avatars/avatar-1.png",
    "assets/Avatars/avatar-2.png",
    "assets/Avatars/avatar-3.png",
    "assets/Avatars/avatar-4.png",
    "assets/Avatars/avatar-5.png",
    "assets/Avatars/avatar-6.png",
    "assets/Avatars/avatar-7.png",
    "assets/Avatars/avatar-8.png",
    "assets/Avatars/avatar-9.png",
  ];
  selectedAvatar = "assets/Avatars/avatar-0.png";
  currentImage: number = 0;
  image = this.images[this.currentImage];
  breakAnimation: boolean = false;
  settingsClicked: boolean = false;
  isSideOpen: boolean = false;
  selectedCity: string = "";
  weatherError: boolean = false;
  weatherErrorText: string = "";
  weatherData: any;
  city: string = "";
  showSide = true;
  insertAvatarText: string = "";
  linkError: string = "";
  insertImageText: string = "";
  linkErrorImage: string= "";

  constructor(private service: WeatherServiceService) { }


  ngOnInit() {
    this.selectedCity = "Paratwada";
    this.getWeatherData();

    for (let i = 1; i <= 19; i++) {
      this.images.push("assets/Images/bg-" + i + ".jpeg");
    }

    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 1;
    setInterval(drawClock, 1000);

    function drawClock() {
      drawFace(ctx, radius);
      drawNumbers(ctx, radius);
      drawTime(ctx, radius);
    }

    function drawFace(ctx, radius) {
      var grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#efefef';
      ctx.fill();
      grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
      // grad.addColorStop(0, '#333');
      // grad.addColorStop(0.5, 'white');
      // grad.addColorStop(1, '#333');
      ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.0;
      // ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
      // ctx.fillStyle = '#749C75';
      ctx.fillStyle = '#4545458d';
      ctx.fill();
    }

    function drawNumbers(ctx, radius) {
      var ang;
      var num;
      ctx.font = radius * 0.15 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (num = 1; num < 61; num++) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        // ctx.fillText(num.toString(), 0, 0);
        if (num % 5 !== 0) { ctx.fillText("·", 0, 0); }
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
      ctx.fillStyle = '#000';
      ctx.font = radius * 0.1 + "px Cabin";
      for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        // ctx.fillText(num.toString(), 0, 0);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
      ctx.fill();
    }

    function drawTime(ctx, radius) {
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      //hour
      hour = hour % 12;
      hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
      // drawHand(ctx, hour, radius * 0.3, radius * 0.03, "#557755");
      drawHand(ctx, hour, radius * 0.3, radius * 0.03, "#121212");
      //minute
      minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
      // drawHand(ctx, minute, radius * 0.6, radius * 0.03, "#668F66");
      drawHand(ctx, minute, radius * 0.6, radius * 0.03, "#121212");
      // second
      second = (second * Math.PI / 30);
      // drawHand(ctx, second, radius * 0.95, radius * 0.01, "#749C75");
      drawHand(ctx, second, radius * 0.95, radius * 0.01, "#121212");
    }

    function drawHand(ctx, pos, length, width, color) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.fillStyle = color;
      ctx.fill();
      var grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
      grad.addColorStop(0, color);
      ctx.strokeStyle = grad;
      ctx.stroke();
      ctx.rotate(-pos);
    }

    this.changeImage(this);

  }



  changeImage(that) {
    that.image = that.images[this.currentImage];
    this.currentImage = this.currentImage + 1;

    if (this.currentImage + 1 == this.images.length) {
      this.currentImage = 0;
    }

    setTimeout(() => {
      if (!this.breakAnimation) {
        this.changeImage(that);
      }
    }, 30000);
  }

  changeImageManually(text: string) {
    if (text == "next") {
      this.currentImage = this.currentImage < this.images.length - 1 ? this.currentImage + 1 : 0;
      this.image = this.images[this.currentImage];
    }

    if (text == "previous") {
      this.currentImage = this.currentImage == 0 ? this.images.length - 1 : this.currentImage - 1;
      this.image = this.images[this.currentImage];
    }
  }

  settingsClick(event) {
    this.settingsClicked = !this.settingsClicked;
    let side = document.getElementById("side-nav");
    if (this.isSideOpen) {
      side.classList.remove("show-side");
      side.classList.add("hide-side");
    } else {
      side.classList.add("show-side");
      side.classList.remove("hide-side");
    }
    this.isSideOpen = !this.isSideOpen;
  }

  changeAnimation() {
    this.breakAnimation = !this.breakAnimation;
    if (!this.breakAnimation) {
      this.changeImage(this);
    }
  }

  updateCity(event: any) {
    this.selectedCity = event.target.value;
    this.getWeatherData();
  }

  getWeatherData() {
    this.service.getWeather(this.selectedCity).subscribe(
      (data: any) => {
        this.weatherError = false;
        this.weatherErrorText = "City Found : ";
        this.city = data?.location?.name;
        this.service.setCity(data?.location?.name);
        this.service.setCountry(data?.location?.country);
        this.weatherData = data;
      },
      (error: any) => {
        console.error("Error", error);
        this.weatherError = true;
        this.weatherErrorText = "Unable to find City";
        this.city = "";
      }
    )
  }

  selectImage(image) {
    this.image = image;
  }

  selectAvatar(image) {
    this.selectedAvatar = image;
  }

  showSideClick() {
    this.showSide = !this.showSide;
  }

  insertAvatar(event) {
    console.log("Avatar", event.target.value);
    let pattern = new RegExp(/(https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    let res = pattern.test(event.target.value);
    let imgPattern = new RegExp(/\.(jpeg|jpg|gif|png)$/);
    res = imgPattern.test(event.target.value);

    if (res) {
      this.avatars.push(event.target.value);
      this.linkError = "";
    } else {
      this.linkError = "Invalid Link";
    }
  }

  insertImage(event) {
    console.log("Image", event.target.value);
    let pattern = new RegExp(/(https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    let res = pattern.test(event.target.value);
    let imgPattern = new RegExp(/\.(jpeg|jpg|gif|png)$/);
    res = imgPattern.test(event.target.value);
    if (res) {
      this.images.push(event.target.value);
      this.linkErrorImage = "";
    } else {
      this.linkErrorImage = "Invalid Link";
    }
  }

}
