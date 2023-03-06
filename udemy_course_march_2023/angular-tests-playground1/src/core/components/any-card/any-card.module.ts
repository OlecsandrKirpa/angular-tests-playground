import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnyCardComponent } from './any-card.component';



@NgModule({
  declarations: [
    AnyCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnyCardComponent
  ]
})
export class AnyCardModule { }
