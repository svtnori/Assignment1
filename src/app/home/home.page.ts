import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})
export class HomePage implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  ionViewWillEnter() {
    console.log("You will now enter home page.")
  }
  ionViewDidEnter() {
    console.log("You did enter home page.")
  }
  ionViewWillLeave() {
    console.log("You will now leave home page.")
  }
  ionViewDidLeave() {
    console.log("You did leave home page.")
  }

  goWithAuthorization() {
    this.authorizationService.canProceed = true;
  }
  goToMySecondPage() {
    this.router.navigate(["second-page"])
  }

}
