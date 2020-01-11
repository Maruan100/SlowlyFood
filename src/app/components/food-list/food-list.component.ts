import { Component, OnInit, Input, Renderer2, IterableDiffers } from '@angular/core';
import { Platos } from 'src/app/models/platos';
import { PlatoServices } from 'src/app/services/platos.services';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  providers: [PlatoServices]
})
export class FoodListComponent implements OnInit {

  @Input() platos: Array<Platos>;

  public singleProduct;


  public getPrimerPlato: Array<Platos>;
  public getSegundoPlato: Array<Platos>;
  public getDessertPlato: Array<Platos>;

  public showAllPlato: boolean = true;
  public showPrimerPlato: boolean = false;
  public showSegundoPlato: boolean = false;
  public showDessertPlato: boolean = false;

  public loading: boolean;


  constructor(
    private _platosService: PlatoServices,
    private _cartService :CartService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    return (
      this._platosService.getPlatos().subscribe(
        response => {
          if (response.articles) {
            this.platos = response.articles;
          } else {
          }
          this.getPrimerPlato = this.platos.filter(
            plato => plato.category === 'primer plato',
            this.loading = false
          );
          console.log(this.getPrimerPlato);

          this.getSegundoPlato = this.platos.filter(
            plato => plato.category === 'segundo plato'
          );
          console.log(this.getSegundoPlato);

          this.getDessertPlato = this.platos.filter(
            plato => plato.category === 'postre'
          );
          console.log(this.getDessertPlato);
        },
        error => {
          console.log(error);
        }
      )
    )

  }
  
  btnAllPlato() {
    this.showPrimerPlato = false;
    this.showAllPlato = true;
    this.showSegundoPlato = false;
    this.showDessertPlato = false;
  }

  btnPrimerPlato() {
    this.showPrimerPlato = true;
    this.showAllPlato = false;
    this.showSegundoPlato = false;
    this.showDessertPlato = false;
  }

  btnSegundoPlato() {
    this.showPrimerPlato = false;
    this.showAllPlato = false;
    this.showSegundoPlato = true;
    this.showDessertPlato = false;
  }

  btnDessertPlato() {
    this.showPrimerPlato = false;
    this.showAllPlato = false;
    this.showSegundoPlato = false;
    this.showDessertPlato = true;
  }


addToCart(productId){

  this.singleProduct = this.platos.filter(product => {
  return product._id === productId;
});

this._cartService.addPlato(this.singleProduct[0]);
}

}
