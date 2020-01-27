import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/users.services';
import { CartService } from 'src/app/services/cart.services';
import { Order } from 'src/app/models/order';
import { Platos } from 'src/app/models/platos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, DoCheck, AfterViewInit {

  public isLogged: boolean = false;
  public errors: string;
  public paypalLoaded = false;
  public errorsRegister: string;

  public products: Array<Platos>;

  public order = {} as Order;
  public ActualDate:any;

  public totalAmmount: number;
  public quantity: number;
  paidFor = false;

  loginForm: FormGroup;
  registerForm: FormGroup;
  orderForm:FormGroup;


  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private router: Router,
    public formBuilder:FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]],
      password:['',[Validators.required,Validators.minLength(7)]],
    });

    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.pattern("[a-zA-Z]+")]],
      email:['',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]],
      password:['',[Validators.required,Validators.minLength(7)]],
    });

    this.orderForm = this.formBuilder.group({
      street: ['', [Validators.required]],
      flat: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.pattern(/^[679]{1}[0-9]{8}$/)]],
      city: ['', [Validators.required,Validators.pattern("[a-zA-Z]+")]],
      zip: ['', [Validators.required,Validators.maxLength(5),Validators.minLength(5),Validators.pattern(/^\d+$/)]],
      cardNumber: ['', [Validators.required,Validators.pattern(/^\d+$/),
       // Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/)
      ]],
      cardName: ['', [Validators.required,Validators.pattern("[a-zA-Z]+")]],
      cardCcv: ['', [Validators.required,Validators.maxLength(3),Validators.pattern(/^\d+$/)]],
    });
  }

  ngAfterViewInit() {
    this.paypalPay()
  }
  
  ngOnInit() {

    this.getCurrentUser();
    console.log(this.order);

    this.order.date = this._authService.actualDate;

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
              currency: 'EUR',
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
    this.paypalLoaded = true;
  }


  ngDoCheck() {
    this.errors;

    this.totalAmmount = this._cartService.getTotalPrice();
    this.order.totalPrice = this.totalAmmount;

    this.quantity = this._cartService.platos.length;
    
    if(this.quantity === 0){
      this.router.navigate(['carta']);
    }

    this.order.quantity = this.quantity;

    this.errorsRegister = this._authService.errorsRegistre;

    this.order.products = this._cartService.platos;
  
  }

 
  createOrder() {
    this.order.address = this.orderForm.value;
    this._authService.addOrde(this.order);

    console.log(this.order);

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


  async onRegister(){
    const user = await this._authService.createUser(this.registerForm.value);
   if (this.errorsRegister) {
    this.errorsRegister = this._authService.errorsRegistre;
    this.errorsRegister = 'Error al crear usuario'
   }
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
      .loginEmailUser(this.loginForm.value)
      .then(res => {
        // this.router.navigate(['carta']);
      })
      .catch((err) => {
        console.log('err', err);
        this.errors = err.message;
        this.errors = 'Email o contraseña incorrecto!';
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
