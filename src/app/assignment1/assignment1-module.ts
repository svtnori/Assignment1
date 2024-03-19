import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Assignment1RoutingModule } from './assignment1-routing.module';
import { Assignment1 } from './assignment1-page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Assignment1RoutingModule
    ],
    declarations: [Assignment1]
  
})
export class Assignment1Module {}
