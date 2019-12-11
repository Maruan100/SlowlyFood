import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { HeaderComponent } from './components/header/header.component';
import { FoodCardInfoComponent } from './components/food-card-info/food-card-info.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FoodListComponent,
    CartShoppingComponent,
    HeaderComponent,
    FoodCardInfoComponent,
    FooterComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
