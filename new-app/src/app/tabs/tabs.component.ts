import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  username: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }
  
  goToCalculatorTab() {
    this.router.navigate(['tabs', 'calculator']);
  }

  goToHomeTab() {
    this.router.navigate(['tabs', 'dashboard']);
  }

}