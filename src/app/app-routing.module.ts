import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodCardInfoComponent } from './components/food-card-info/food-card-info.component';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { PaymentComponent } from './components/payment/payment.component';
import { EndPageComponent } from './components/end-page/end-page.component';
import { OrdersComponent } from './components/orders/orders.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'carta',
    component: FoodListComponent
  },
  {
    path: 'carta/plato/:id',
    component: FoodCardInfoComponent
  },
  {
    path: 'pago',
    component: PaymentComponent
  },
  {
    path: 'end-page',
    component: EndPageComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
