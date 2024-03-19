import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './second-page.page.html',
})
export class SecondPagePage implements OnInit {

  constructor(private authorizationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authorizationService.canProceed = false;
  }
  ionViewWillEnter() {
    console.log("You will now enter second page.")
  }
  ionViewDidEnter() {
    console.log("You did enter second page.")
  }
  ionViewWillLeave() {
    console.log("You will now leave second page.")
  }
  ionViewDidLeave() {
    console.log("You did leave second page.")
  }

  goWithAuthorization() {
    this.authorizationService.canProceed = true;
  }
  goToMySharedPage() {
    this.router.navigate(["shared-component"])
  }
}
