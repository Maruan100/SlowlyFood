import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Platos } from '../models/platos';


@Injectable()
export class SharedService {
  // Local variable which stores
  public cartItems = [];
  public products = new Subject();
  public platos: Platos[] = [];


  getProducts(): Observable<any> {
    console.log('this.cartItems :', this.cartItems);
    this.getCarrito()
    return this.products.asObservable();
  }

  getCarrito(){
    if (localStorage.getItem('plato') === null){
      return this.platos
    }else{
      this.platos = JSON.parse(localStorage.getItem('plato'));
      return console.log(this.platos);
    }
  }

  setProducts(products) {
    this.cartItems.push(...products);
    this.products.next(products);
  }

  // Add single product to the cart
  addProductToCart(product) {
    this.cartItems.push(product);
    this.products.next(this.cartItems);

    if (localStorage.getItem('plato') === null) {
      this.platos.push(product)
      localStorage.setItem('plato', JSON.stringify(this.platos))
    } else {
      this.platos = JSON.parse(localStorage.getItem('plato'));
      this.platos.push(product);
      localStorage.setItem('plato', JSON.stringify(this.platos))
    }

  }

  // Remove single product from the cart
  removeProductFromCart(productId) {
    this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    // Update Observable value
    this.products.next(this.cartItems);
  }

  // Remove all the items added to the cart
  emptryCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
  }

  // Calculate total price on item added to the cart
  getTotalPrice() {
    let total = 0;

    this.cartItems.map(item => {
      total += item.price;
    });

    return total
  }

}
