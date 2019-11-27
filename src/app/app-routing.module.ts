import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodCardInfoComponent } from './components/food-card-info/food-card-info.component';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'carta-de-platos',
    component: FoodListComponent
  },
  {
    path: 'food-info',
    component: FoodCardInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
