import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { PhoenixnavbarComponent } from './core/phoenixnavbar/phoenixnavbar.component';
import { PhoenixfooterComponent } from './core/phoenixfooter/phoenixfooter.component';
import { ProductComponent } from './component/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorComponent } from './component/vendor/vendor.component';
import { PurchaseOrderComponent } from './component/purchase-order/purchase-order.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { PosComponent } from './component/pos/pos.component';
import { InvoiceComponent } from './component/invoice/invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PhoenixnavbarComponent,
    PhoenixfooterComponent,
    ProductComponent,
    VendorComponent,
    PurchaseOrderComponent,
    PosComponent,
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
