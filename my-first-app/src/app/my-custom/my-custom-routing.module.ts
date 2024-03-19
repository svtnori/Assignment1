import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCustomPage } from './my-custom.page';
import { MyCustomPageWithID } from './my-custom-page-with-id/my-custom-page-with';

const routes: Routes = [
  {
    path: '',
    component: MyCustomPage
  },
  {
    path: 'my-custom-page-with-id/:id',
    component: MyCustomPageWithID
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCustomPageRoutingModule {}
