import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Order } from '../models/address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  newUser: any;
  public errorsRegistre: string;
  public addressCollection: AngularFirestoreCollection<Order>;
  public orders: Array<Order>;
  public actualDate:any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
  ) {
   this.addressCollection = this.db.collection(`Orders`);

   this.actualDate = this.addDataToOrder();
  }




  createUser(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(useCredential => {
        this.newUser = user;

        useCredential.user.updateProfile({
          displayName: user.name
        });

        this.insertUserData(useCredential).then(() => {
     
            this.router.navigate(['carta'])
    
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.errorsRegistre = err.message;
      });
  }



  insertUserData(useCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${useCredential.user.uid}`).set({
      email: this.newUser.email,
      name: this.newUser.name,
      // Direction:

    });
  }

  addDataToOrder(){
    let f = new Date();
    return f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
  }


  addOrde(order: Order){
    this.addressCollection.add(order);
    this.router.navigate(['end-page']);
  }

  getOrder() {
    return this.orders;
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then((userData) => resolve(userData)),
        err => reject(err)
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(
        userData => resolve(userData),
        err => reject(err)
      );
    });
  }

  loginFacebookUser() {
    return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  loginGoogleUser() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logOutUser() {
    return this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }
}
