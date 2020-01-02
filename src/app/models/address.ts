import { Platos } from './platos';

export class Order {
  constructor(
    public userUid: string,
    public street: string,
    public falt: string,
    public phone: string,
    public city: string,
    public zip: string,
    public products: Array<Platos>,
    public totalPrice: number,
    public quantity:number,
    public date: any,
  ) {}
}

// public userUid: string,
