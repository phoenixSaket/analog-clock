import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartModule } from 'angular2-chartjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    ChartModule,
    MatButtonModule
  ],
  exports: [
    MatSidenavModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    ChartModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
