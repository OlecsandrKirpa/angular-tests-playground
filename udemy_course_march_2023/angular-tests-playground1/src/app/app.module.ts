import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnyCardModule } from 'src/core/components/any-card/any-card.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AnyCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
