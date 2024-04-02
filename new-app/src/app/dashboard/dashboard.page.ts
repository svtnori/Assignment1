import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Pokemon } from '../model/model';
import { ModalComponent } from '../modal/modal.component';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  pokemons: Pokemon[] = [];
  volume = 100;
  condition = false;
  constructor(private data: DataService, private modalController: ModalController, private alertController: AlertController,  private toastController: ToastController) { }

  ngOnInit() {
    this.data.getPokemon().subscribe(item => {
      this.pokemons = item;
      console.log(item);
    })
  }
  async toggleModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });
    return await modal.present();
  }
  async alert(){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentToast(){
    const toast = await this.toastController.create({
      message: 'Your Toast Message Here',
      duration: 2000
    });
    toast.present();
  }
  async dismissToast(){
    const toast = await this.toastController.getTop();
    if (toast) {
      toast.dismiss();
    }
  }
  
}