import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { MortgageComponent } from './mortgage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng5SliderModule
  ],
  declarations: [MortgageComponent],
  exports: [MortgageComponent]
})
export class MortgageModule { }
