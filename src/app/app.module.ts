import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FoodListComponent } from './components/food-list/food-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FoodCardInfoComponent } from './components/food-card-info/food-card-info.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { EndPageComponent } from './components/end-page/end-page.component';
import { OrdersComponent } from './components/orders/orders.component';

// Http
import { HttpClientModule } from '@angular/common/http';

// Firebase
import {AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FoodListComponent,
    HeaderComponent,
    FoodCardInfoComponent,
    FooterComponent,
    PaymentComponent,
    EndPageComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule
  ],
  
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
