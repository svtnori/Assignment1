import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Assignment1 } from './assignment1-page';


const routes: Routes = [
  {
    path: '',
    component: Assignment1,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Assignment1RoutingModule { }