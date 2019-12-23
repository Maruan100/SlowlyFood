import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  newUser: any;
  public errorsRegistre: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  createUser(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(useCredential => {
        this.newUser = user;

        useCredential.user.updateProfile({
          displayName: user.name
        });

        this.insertUserData(useCredential).then(() => {
         
        });
      })
      .catch((err) =>{
        console.log(err.message);
        this.errorsRegistre = err.message;
      });
  }

  insertUserData(useCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${useCredential.user.uid}`).set({
      email: this.newUser.email,
      name: this.newUser.name
    });
  }

  registerUser(email: string, pass: string){
    return new Promise ((resolve , reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword(email,pass)
      .then( (userData) => resolve (userData)),
      err => reject(err)});
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
    return this.afAuth.authState.pipe(map( auth => auth));
  }
}
