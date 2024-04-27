import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private service: ServiceService, private router: Router) {}

  logOut() {
    this.router.navigate(['login']);
    this.service.setAuthentication(false);
  }

}
