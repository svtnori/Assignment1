import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SecondPagePage } from './second-page/second-page.page';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponent } from './shared-component/shared-component';

@NgModule({
  declarations: [AppComponent, SecondPagePage, SharedComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
