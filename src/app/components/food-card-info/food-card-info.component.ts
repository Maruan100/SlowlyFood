import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoServices } from 'src/app/services/platos.services';
import { Platos } from 'src/app/models/platos';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-food-card-info',
  templateUrl: './food-card-info.component.html',
  styleUrls: ['./food-card-info.component.css'],
  providers: [PlatoServices]
})
export class FoodCardInfoComponent implements OnInit {
  
  @Input() plato: Platos[];
  private singleProduct;
  private isAdded;

  constructor(
    public _platoService: PlatoServices,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    this._route.params.subscribe(params => {
      const id = params['id'];

      this._platoService.getPlato(id).subscribe(
        response => {
          if (response.article) {
            this.plato = response.article;
            console.log(this.plato);
          } else {
            this._router.navigate(['/']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }



addToCart(plato){

this._cartService.addPlato(plato);
}


}
