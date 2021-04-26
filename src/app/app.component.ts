import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'analog-clock';
  images = [
    "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2748716/pexels-photo-2748716.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/797797/pexels-photo-797797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/358532/pexels-photo-358532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/247478/pexels-photo-247478.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  ];
  currentImage: number = 0;
  image = this.images[this.currentImage];
  breakAnimation: boolean = false;
  settingsClicked: boolean = false;

  ngOnInit() {
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
      ctx.fillStyle = '#121212';
      ctx.fill();
    }

    function drawNumbers(ctx, radius) {
      var ang;
      var num;
      ctx.font = radius * 0.05 + "px arial";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        // ctx.fillText(num.toString(), 0, 0);
        ctx.fillText("*", 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
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
    }, 10000);
  }

  changeImageManually(text: string) {
    console.log("Image Change : ", text)
    this.breakAnimation = true;
    if (text == "next") {
      this.currentImage = this.currentImage + 1;
      this.image = this.images[this.currentImage];
    }

    if (text == "previous") {
      this.currentImage = this.currentImage - 1;
      this.image = this.images[this.currentImage];
    }
  }

  settingsClick() {
    this.settingsClicked = !this.settingsClicked;
  }
}
