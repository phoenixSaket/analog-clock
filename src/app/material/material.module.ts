import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule
  ],
  exports: [
    MatSidenavModule,
    MatInputModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule { }
