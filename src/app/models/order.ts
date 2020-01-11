import { Platos } from './platos';

export class Order {
  constructor(
    public userUid: string,
    public address: Array<Address>,
    public products: Array<Platos>,
    public totalPrice: number,
    public quantity:number,
    public date: any,
  ) {}
}

interface Address {
   street: string,
   flat: string,
   phone: string,
   city: string,
   zip: string,
}