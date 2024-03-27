import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Pokemon } from '../model/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  pokemons: Pokemon[] = [];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getPokemon().subscribe(item => {
      this.pokemons = item;
      console.log(item);
    })
  }
}