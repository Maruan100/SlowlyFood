import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/users.services';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.services';
import { Platos } from 'src/app/models/platos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {

  public platosAdd: Array<Platos>;
  public isLogged: boolean = false;
  public users: any;

  public cartProductCount: number = 0;

  public cartItems;
  public totalAmmount;
  protected countArray: number[] = []

  public cartOpened: boolean;


  Users: firebase.User;

  constructor(
    private _authService: AuthService,
    private router: Router,
    private _cartService: CartService
  ) {
    this.cartOpened = false;
  }

  ngOnInit() {
    this.getCurrentUser();
    this._authService.isAuth().subscribe(user => {
      if (user) {
        this.users = user;
        console.log(user);
      }
  });
}

  ngDoCheck() {
    this.totalAmmount = this._cartService.getTotalPrice();
    this.cartProductCount = this._cartService.platos.length;
    const response = this._cartService.createList();
    this.platosAdd = response[0];
    this.countArray = response[1];
  }  

  delateItem(plato){
    this._cartService.delateTask(plato);
    this.platosAdd = [];
  }

  addMore(plato){
    this._cartService.addPlato(plato)
  }

  delateOne(plato){
    this._cartService.delateOne(plato)
  }

  openCart() {
    this.cartOpened = !this.cartOpened;
  }
  
  closeCart() {
    this.cartOpened = false;
  }

  closeMenuForPhone() {
    //document.getElementById("nav").checked = false;
  }

  LogOut() {
    this._authService.logOutUser();
    
      this.router.navigate(['/home']);
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
}
