import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/users.services';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit , DoCheck{
  public isLogged: boolean = false;
  public email: string = '';
  public pass: string = '';
  public errors: string;

  public totalAmmount;

  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  ngDoCheck() {
    
    this.totalAmmount = this._cartService.getTotalPrice();

  }
  
  getCurrentUser() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user loggado');
        this.isLogged = true;
      } else {
        console.log('No logado');
        this.isLogged = false;
      }
    });
  }

  onLoginGoogle(): void {
    this._authService
      .loginGoogleUser()
      .then(res => {
        console.log('Respuesta:', res);
      })
      .catch((err) => {
        console.log('err', err);
        this.errors = err.message;
      });
  }

  


  OnregisterUser(frm) {
    this._authService.createUser(frm.value);

  }

  
  onLoginFacebook(): void {
    this._authService
      .loginFacebookUser()
      .then(res => {
        console.log(res);
        
      })
      .catch(err => console.log('err', err));
  }


  onLoginMail(): void {
    this._authService
      .loginEmailUser(this.email, this.pass)
      .then(res => {
      })
      .catch((err) => {
        console.log('err', err);
        this.errors = err.message;
      });
  }

  addUserMenu() {
    let textRegister = document.getElementById("text-user-register");
    textRegister.classList.remove("active");

    let textUser = document.getElementById("text-user");
    textUser.classList.add("active");


    let userForm = document.getElementById("user-form");
    userForm.classList.remove("hide");

  
    let registerForm = document.getElementById("register-form");
    registerForm.classList.add("hide")

  }

  addRegisterMenu(){
    let textRegister = document.getElementById("text-user-register");
    textRegister.classList.add("active");

    let textUser = document.getElementById("text-user");
    textUser.classList.remove("active");

    let userForm = document.getElementById("user-form");
    userForm.classList.add("hide");

  
    let registerForm = document.getElementById("register-form");
    registerForm.classList.remove("hide")

  } 

}
