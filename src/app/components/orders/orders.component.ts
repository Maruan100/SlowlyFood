import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from 'src/app/models/address';
import { AuthService } from 'src/app/services/users.services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public isLogged: boolean = false;
  public getOrders: any[];
  public getOrderByUser: Order[];
  public currentUserUid: any;
  public loading: boolean;
 // public noOrders:boolean = true;

  constructor(private afs: AngularFirestore, private _authService: AuthService) { 
    this.loading = true;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.afs.collection(`Orders`).valueChanges().subscribe( item => {
      this.getOrders = item;
      this.getOrderByUser = this.getOrders.filter( order => order.userUid === this.currentUserUid);
      this.loading = false;
      console.log(this.getOrderByUser);
    });
  }

  getCurrentUser() {
    this._authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user loggado');
        this.isLogged = true;
        this.currentUserUid = auth.uid;
        console.log(this.currentUserUid);
      } else {
        console.log('No logado');
        this.isLogged = false;
      }
    });
  }

  openDropDown(){
    console.log('illo');
    
    let btn = document.querySelector('#btn-dropdown');
    btn.classList.add('drowdown-open');
  }

}
