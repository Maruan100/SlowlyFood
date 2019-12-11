import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoServices } from 'src/app/services/platos.services';
import { Platos } from 'src/app/models/platos';

@Component({
  selector: 'app-food-card-info',
  templateUrl: './food-card-info.component.html',
  styleUrls: ['./food-card-info.component.css'],
  providers: [PlatoServices]
})
export class FoodCardInfoComponent implements OnInit {
  public plato: Platos;

  constructor(
    public _platoService: PlatoServices,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      const id = params['id'];

      this._platoService.getPlato(id).subscribe(
        response => {
          if(response.article){
            this.plato = response.article;
          }else{
              this._router.navigate(['/'])
          }
        },
        error => {
          console.log(error);

        }
      );

    });
  }

}
