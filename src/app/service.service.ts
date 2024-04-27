import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  canProceed = false;
  constructor(private alertController: AlertController, private router: Router, private toastController: ToastController) { }

  canActivate() {
    if (localStorage.getItem("lOGGED IN") == "true") {
      return true;
    }
    this.router.navigate(['LOGIN']);
    return false
  }

  setAuthentication(auth: boolean) {
    if (auth == true) {
      localStorage.setItem("LOGGED IN", "true");
    } else (
      localStorage.setItem("LOGGED IN", "false")
    )
  }
  
  async signUp(email: string, password: string, confirmPassword: string) {
    if (!email || !password || !confirmPassword) {
      this.presentAlert('ERROR', 'Please fill in all fields.');
      return; 
    }

    if (password !== confirmPassword) {
      this.presentAlert('ERROR', 'Password do not match.');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.presentAlert('SUCCESS', 'SIGN UP SUCCESSFULLY.');
      this.router.navigate(['LOGIN']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async logIn(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      this.setAuthentication(true);
      this.presentAlert('SUCCESS', 'LOG IN SUCCESSFULLY.');
      this.router.navigate(['home']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      if(errorMessage.Includes("Error (auth/invalid-credential)")){
        this.presentAlert('ERROR', 'INVALID EMAIL/PASSWORD');
      } else if(errorMessage.Includes("Error (auth/invalid-email")){
        this.presentAlert('ERROR', 'INVALID EMAIL');
      }
      
    })
}
}
