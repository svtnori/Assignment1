import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email: string ='';
password: string ='';

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }
  async logIn(){
    this.service.logIn(this.email, this.password);
    
  }
}
