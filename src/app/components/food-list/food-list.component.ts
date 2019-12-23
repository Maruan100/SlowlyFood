import { Component, OnInit, Input, Renderer2, IterableDiffers } from '@angular/core';
import { Platos } from 'src/app/models/platos';
import { PlatoServices } from 'src/app/services/platos.services';
import { SharedService } from 'src/app/services/shared.service';
import { CartService } from 'src/app/services/cart.services';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  providers: [PlatoServices]
})
export class FoodListComponent implements OnInit {

  @Input() platos: Platos[];

  public singleProduct;

  //public platos: Array<Platos>;

  public getPrimerPlato: Array<Platos>;
  public getSegundoPlato: Array<Platos>;
  public getDessertPlato: Array<Platos>;

  public showAllPlato: boolean = true;
  public showPrimerPlato: boolean = false;
  public showSegundoPlato: boolean = false;
  public showDessertPlato: boolean = false;

  // buttons

  constructor(
    private _platosService: PlatoServices,
    private _cartService :CartService
  ) {}

  ngOnInit() {
    return (
      this._platosService.getPlatos().subscribe(
        response => {
          if (response.articles) {
            this.platos = response.articles;
          } else {
          }
          this.getPrimerPlato = this.platos.filter(
            plato => plato.category === 'primer plato'
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

    let btnALL = document.getElementById('btnAll');
    let btnFirstPlates = document.getElementById('btnFirst');
    let btnSecondsPlates = document.getElementById('btnSecond');
    let btnDessertPlates = document.getElementById('btnDessert');

    btnALL.classList.add('active');
    btnFirstPlates.classList.remove('active');
    btnSecondsPlates.classList.remove('active');
    btnDessertPlates.classList.remove('active');
  }

  btnPrimerPlato() {
    this.showPrimerPlato = true;
    this.showAllPlato = false;
    this.showSegundoPlato = false;
    this.showDessertPlato = false;

    let btnALL = document.getElementById('btnAll');
    let btnFirstPlates = document.getElementById('btnFirst');
    let btnSecondsPlates = document.getElementById('btnSecond');
    let btnDessertPlates = document.getElementById('btnDessert');

    btnALL.classList.remove('active');
    btnFirstPlates.classList.add('active');
    btnSecondsPlates.classList.remove('active');
    btnDessertPlates.classList.remove('active');
  }

  btnSegundoPlato() {
    this.showPrimerPlato = false;
    this.showAllPlato = false;
    this.showSegundoPlato = true;
    this.showDessertPlato = false;

    let btnALL = document.getElementById('btnAll');
    let btnFirstPlates = document.getElementById('btnFirst');
    let btnSecondsPlates = document.getElementById('btnSecond');
    let btnDessertPlates = document.getElementById('btnDessert');

    btnALL.classList.remove('active');
    btnFirstPlates.classList.remove('active');
    btnSecondsPlates.classList.add('active');
    btnDessertPlates.classList.remove('active');
  }

  btnDessertPlato() {
    this.showPrimerPlato = false;
    this.showAllPlato = false;
    this.showSegundoPlato = false;
    this.showDessertPlato = true;

    let btnALL = document.getElementById('btnAll');
    let btnFirstPlates = document.getElementById('btnFirst');
    let btnSecondsPlates = document.getElementById('btnSecond');
    let btnDessertPlates = document.getElementById('btnDessert');

    btnALL.classList.remove('active');
    btnFirstPlates.classList.remove('active');
    btnSecondsPlates.classList.remove('active');
    btnDessertPlates.classList.add('active');
  }

btnAnimation(){

}


addToCart(productId){

  this.singleProduct = this.platos.filter(product => {
  return product._id === productId;
});

this._cartService.addPlato(this.singleProduct[0]);
}

}
