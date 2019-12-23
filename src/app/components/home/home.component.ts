import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/users.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public userInfo: string ;
  public email: string = '';
  public pass: string = '';
  public errors: string;
  public userData: string;
  public registError = this._authService.errorsRegistre;



  constructor(
    public _authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.userData);
  }

  OnregisterUser(frm) {
    this._authService.createUser(frm.value);
    console.log(this.registError);
  }

  onLoginMail(): void {
    this._authService
      .loginEmailUser(this.email, this.pass)
      .then(res => {
        this.router.navigate(['carta']);
      })
      .catch((err) => {
        console.log('err', err);
        this.errors = err.message;
      });
  }
  
  onLoginGoogle(): void {
    this._authService
      .loginGoogleUser()
      .then(res => {
        console.log('Respuesta:', res);
         this.router.navigate(['carta']);
         setTimeout(() => {
           location.reload();
        }, 0.1);
      })
      .catch((err) => {
        console.log('err', err);
        this.errors = err.message;
      });
  }

  onLoginFacebook(): void {
    this._authService
      .loginFacebookUser()
      .then(res => {
        this.router.navigate(['carta']);
      })
      .catch(err => console.log('err', err));
  }
}
