import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodCardInfoComponent } from './components/food-card-info/food-card-info.component';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { PaymentComponent } from './components/payment/payment.component';


const appRoutes: Routes = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
