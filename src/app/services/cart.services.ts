import { Injectable } from "@angular/core";
import { Platos } from '../models/platos';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    platos: Platos[];

    constructor() {
        this.platos = [
            // {title: 'leet', description: 'tengo que leer',hide:true},
            // {title: 'leer', description: 'tengo que leer3',hide:true},
            // {title: 'leer', description: 'tengo que leer3',hide: true},
        ]
    }

    getPlatos() {
        if (localStorage.getItem('Platos') === null) {
            return this.platos;
        }else {
            this.platos = JSON.parse(localStorage.getItem('Platos'));
            return this.platos;
        }

    }

    addPlato(plato) {
        this.platos.push(plato);
        let platos: Array<Platos> = [];

        if (localStorage.getItem('Platos') === null) {
            platos.push(plato);
            localStorage.setItem('Platos', JSON.stringify(platos));
        }else {
            platos = JSON.parse(localStorage.getItem('Platos'));
            platos.push(plato);
            localStorage.setItem('Platos', JSON.stringify(platos));
        }

    }

    delateTask(plato) {
        for (let i = 0; i < this.platos.length; i++) {
            if (plato === this.platos[i]) {
                this.platos.splice(i, 1);
                localStorage.setItem('Platos', JSON.stringify(this.platos));
            }
        }
    }

    getTotalPrice() {
        let total = 0;
    
        this.platos.map(item => {
          total += item.price;
        });
    
        return total;
      }

}