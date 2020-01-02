import { Injectable } from "@angular/core";
import { Platos } from '../models/platos';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    platos: Platos[];

    itemsInCart: Platos[];

    constructor() {
        this.platos = [];
        this.itemsInCart = this.getPlatos();
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


        let cart = document.getElementById('cart-number');
        cart.classList.add('cart-animation');

        setTimeout(() => {
            cart.classList.remove('cart-animation');
        }, 500);

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