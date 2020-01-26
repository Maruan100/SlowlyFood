import { Injectable } from "@angular/core";
import { Platos } from '../models/platos';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    platos: Platos[] = [];
    totalAmount;

    constructor() {
        this.platos = this.getPlatos().sort()
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

    createList(): any[] {
        const newList: Platos[] = [];
        const newCountArray: number[] = [];
        this.platos.forEach((plato) => {
          if (!this.checkRepeat(newList, plato._id)) {
            newList.push(plato);
            newCountArray.push(1);
          } else {
            const index = newList.findIndex(e => plato._id === e._id );
            newCountArray[index]++;
          }
        });
        return [newList, newCountArray];
    }

    checkRepeat(list: Platos[], id: string): boolean {
        const index = list.findIndex(e => id === e._id);
        return index !== -1;
    }

    delateTask(plato) {

        const list = this.platos;
        const newList = [];
        list.forEach((element, index) => {
          if (element._id !== plato._id) {
            newList.push(element);
          }
        });
        this.platos = newList;
        localStorage.setItem('Platos', JSON.stringify(newList));
    }


    getTotalPrice() {
        let total = 0;
        this.platos.map((item) => {
          total += item.price;
        });
        return total;
      }

    delateOne(plato){
      const index = this.platos.findIndex(e => e._id === plato._id);
      this.platos.splice(index, 1);
      
      localStorage.setItem('Platos', JSON.stringify(this.platos));
    }

}