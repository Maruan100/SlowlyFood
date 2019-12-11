import { Component, OnInit } from '@angular/core';
import { Platos } from 'src/app/models/platos';
import { PlatoServices } from 'src/app/services/platos.services';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css'],
  providers: [PlatoServices]
})
export class FoodListComponent implements OnInit {

  public platos: Array<Platos>;


  constructor(private _platosService: PlatoServices) {}

  ngOnInit() {
    console.log(this._platosService.getPlatos().subscribe(
      response => {
        if (response.articles) {
          this.platos = response.articles;
        } else {

        }

      },
      error => {
        console.log(error);
      }
    ));  
  }
}
