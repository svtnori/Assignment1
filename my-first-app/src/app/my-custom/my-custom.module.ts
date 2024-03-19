import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCustomPageRoutingModule } from './my-custom-routing.module';

import { MyCustomPage } from './my-custom.page';
import { MyCustomPageWithID} from './my-custom-page-with-id/my-custom-page-with';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCustomPageRoutingModule
  ],
  declarations: [MyCustomPage, MyCustomPageWithID]
})
export class MyCustomPageModule {}
