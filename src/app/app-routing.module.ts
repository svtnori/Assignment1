import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SecondPagePage } from './second-page/second-page.page';
import { AuthenticationService } from './authentication.service';
import { SharedComponent } from './shared-component/shared-component';
const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'second-page',
    component: SecondPagePage,
    canActivate: [AuthenticationService]
  },
  {
    path: 'shared-component',
    component: SharedComponent,
    canActivate: [AuthenticationService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
