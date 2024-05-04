import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { User } from '../home/home.model';
import { LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  users: User = new User();
  genres: string[] = ['Romantic Comedy','Drama','Teen','Romance','Dangerous','Mature','Mystery','Thriller'];
  constructor(private service: ServiceService, private loadController: LoadingController, private router: Router) { }
  ngOnInit() {
  }
  async createUser() {
    if (this.validation()) {
      let loader = await this.loadController.create({
        message: "Waiting...."
      });
      await loader.present();
      if (!this.users.id) {
        this.service.TryAddUser(this.users);
        this.service.presentAlert('SUCCESS', 'SUCCESSFULLY ADDED.')
      }
      this.users = new User();
      await loader.dismiss();
      this.router.navigate(['home']);
    }
  }
  validation() {
    const user = this.users;
    
    if (!user.title) {
      this.service.presentToast('ENTER TITLE', 3000);
      return false;
    }
    
    if (!user.author) {
      this.service.presentToast('ENTER AUTHOR', 3000);
      return false;
    }
    
    if (!user.ratings) {
      this.service.presentToast('ENTER RATINGS', 3000);
      return false;
    }
    
    if (!user.completeChapter) {
      this.service.presentToast('ENTER COMPLETED CHAPTER', 3000);
      return false;
    }
    
    if (!user.genre) {
      this.service.presentToast('ENTER GENRE', 3000);
      return false;
    }
    return true;
  }
}
