import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pokemon } from '../model/model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async closeModal(){
    await this.modalController.dismiss();
  }


}
