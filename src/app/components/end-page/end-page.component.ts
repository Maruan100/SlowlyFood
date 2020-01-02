import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.css']
})
export class EndPageComponent implements OnInit {

  constructor(private _cartService: CartService) {
  }

  ngOnInit() {
    this._cartService.platos.length = 0;
    localStorage.clear();
  }

}
