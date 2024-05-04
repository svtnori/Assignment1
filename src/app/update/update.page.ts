import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, iUser } from '../home/home.model';
import { ServiceService } from '../service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  users: User = new User();
  id: any;
  genres: string[] = ['Romantic Comedy','Drama','Teen','Romance','Dangerous','Mature','Mystery','Thriller'];
  constructor(private route: ActivatedRoute, private service: ServiceService, private loadController: LoadingController,private router: Router ) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.synchUpdate(this.service.newUserList);
  }
  async updateUser() {
    if (this.validation()) {
      let loader = await this.loadController.create({
        message: "Updating..."
      });
      await loader.present();
      if (this.users.id) {
        await this.service.tryUpdateUser(this.users);
        this.service.presentAlert('SUCCESS', 'SUCCESSFULLY UPDATED.');
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
  synchUpdate(users: iUser[]) {
    users.forEach(user => {
      if (this.id == user.id) {
        this.users.id = user.id;
        this.users.title = user.title;
        this.users.author = user.author;
        this.users.ratings = user.ratings;
        this.users.genre = user.genre;
        this.users.completeChapter = user.completeChapter;
      }
    });
  }
}
