import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { iUser, User } from 'src/app/home/home.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  newUserList: iUser[] = [];
  users: User = new User();
  isLoading: boolean = false;
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
  async presentToast(message: string, duration: number){
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
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

async getUsers(): Promise<iUser[]> {
  const app = initializeApp(environment.firebaseConfig);
  const firestore = getFirestore(app);

  const users: User[] = [];

  const querySnapshot = await getDocs(collection(firestore, 'users'));
  querySnapshot.forEach((doc) => {
    const user = doc.data() as User;
    user.id = doc.id;
    users.push(user);
  });
  return users
}
async TryAddUser(user: User) {
  const app = initializeApp(environment.firebaseConfig);
  const firestore = getFirestore(app);
  try {
    const docs = await addDoc(collection(firestore, "users"), {
      title: user.title,
      author: user.author,
      genre: user.genre,
      completeChapter: user.completeChapter,
      ratings: user.ratings
    });
    console.log("Document with ID: ", docs.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async tryUpdateUser(user: User) {
  const app = initializeApp(environment.firebaseConfig);
  const firestore = getFirestore(app);

  try {
    const docRef = doc(firestore, "users", user.id);
    await updateDoc(docRef, {title: user.title, author: user.author, genres: user.genre,completeChapter: user.completeChapter, ratings: user.ratings});
  } catch(e) {
    console.error("Error update document: ", e);
  }
}
async TrydeleteUser(user: User) {
  const app = initializeApp(environment.firebaseConfig);
  const firestore = getFirestore(app);

  try {
    const docRef = doc(firestore, "users", user.id)
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Delete error: ", e);
  }
}
edit(user: iUser) {
  this.users = user;
}

}
