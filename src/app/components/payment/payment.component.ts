import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/users.services';
import { CartService } from 'src/app/services/cart.services';
import { Order } from 'src/app/models/address';
import { Platos } from 'src/app/models/platos';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, DoCheck {
  public isLogged: boolean = false;
  public email: string = '';
  public pass: string = '';
  public errors: string;
  public errorsRegister: string;
  public products: Array<Platos>;
  public order = {} as Order;

  public totalAmmount: number;
  public quantity: number;

  paidFor = false;



  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
  ) {

  }


  ngOnInit() {

    this.getCurrentUser();
    console.log(this.order);


    this.products = this._cartService.getPlatos();
    this.order.products = this.products;


    if (this.isLogged = true) {
      this.paypalPay();
    }
  }


  paypalPay() {
    paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalAmmount,

            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        console.log(order);
      },
      onError: err => {
        console.log(err);
      }
    }).render('#paypal-checkout-btn');
  }


  ngDoCheck() {
    this.errors;

    this.totalAmmount = this._cartService.getTotalPrice();
    this.order.totalPrice = this.totalAmmount;

    this.quantity = this._cartService.platos.length;
    this.order.quantity = this.quantity;

    this.errorsRegister = this._authService.errorsRegistre;
  }

  createOrder() {
    this._authService.addOrde(this.order);
    this._cartService.emptyCart();
  }



  getCurrentUser() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user loggado');
        this.isLogged = true;
        this.order.userUid = auth.uid;
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

  addRegisterMenu() {
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
