import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { User, iUser } from './home.model';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userList: iUser[] = [];
  users: User = new User();
  constructor(private service: ServiceService, private router: Router, private loadController: LoadingController) {
  }
  logOut() {
    this.router.navigate(['login']);
    this.service.setAuthentication(false);
  }

  ionViewWillEnter() {
    this.user();
  }
   update(user: User) {
    this.router.navigate(['update']);
  }
   create() {
    this.router.navigate(['create']);
  }
  async delete(user: User) {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
  
    if (!confirmDelete) {
      return; 
    }
    await this.service.TrydeleteUser(user);
    this.service.presentAlert('SUCCESS', 'DELETED SUCCESSFULLY');
    this.user();
    this.users = new User();
  }
  
  async user() {
    this.service.isLoading = true;
    this.userList = await this.service.getUsers();
    this.service.newUserList = this.userList;
    this.service.isLoading = false;
  }
  
}
