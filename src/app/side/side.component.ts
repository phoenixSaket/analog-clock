import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  @Input() name: string;
  @Input() avatar: string;
  @Input() city: any;

  constructor() { }

  ngOnInit(): void {
    console.log("Name : ", this.name);
    console.log("Avatar : ", this.avatar);
    console.log("Weather : ", this.city);
  }

}
