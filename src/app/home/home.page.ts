import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
})
export class HomePage {
  data: string = '';
  LoadingText: String = 'Loading...';
  isLoading: boolean = false;
  showArray: boolean = false;
  objNum = 0;
  objArray = [""];
  private dataService = this.DataService;

  constructor(private AuthenticationService: AuthenticationService, private router: Router, private DataService: DataService) {

  }
  ngOnInit(): void {
  }

  async fetchData() {
    try {
      this.data = await this.DataService.fetchData(this.AuthenticationService.authenticate);
      console.log(this.data);
    } catch (error) {
      console.log(error);
    }
  }

  authenticate() {
    this.isLoading = true;
    this.showArray = false;
    setTimeout(() => {
      this.isLoading = false;
      this.AuthenticationService.authenticate = true
      alert('Access Granted.');
    }, 2000);
  }

  unauthenticate() {
    this.isLoading = true;
    this.showArray = false;
    setTimeout(() => {
      this.isLoading = false;
      this.AuthenticationService.authenticate = false;
      alert('Access is now removed.');
    }, 2000);
  }

  async showObj() {
    this.isLoading = true;
    this.showArray = false;
    await this.dataService
      .fetchData(this.AuthenticationService.authenticate)
      .then(() => {
        console.log(this.objArray);
        this.showArray = true;
      })
      .catch((error) => {
        alert('Access Denied.');
        console.error('Show Object.', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  async addObj() {
    this.isLoading = true;
    this.showArray = false;
    await this.dataService
      .fetchData(this.AuthenticationService.authenticate)
      .then((data) => {
        console.log(data);
        this.objArray = [...this.objArray, this.objNum.toString()];
        this.objNum += 1;
      })
      .catch((error) => {
        alert('Access Denied.');
        console.error('Add to Object failed.', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

}
