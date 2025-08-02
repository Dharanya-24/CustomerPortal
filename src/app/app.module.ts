import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesDataComponent } from './dashboard/sales-data/sales-data.component';
import { InquiryDataComponent } from './dashboard/inquiry-data/inquiry-data.component';
import { SalesOrderDataComponent } from './dashboard/sales-data/sales-order-data/sales-order-data.component';
import { DeliveryListComponent } from './dashboard/sales-data/delivery-list/delivery-list.component';
import { FinancialSheetComponent } from './dashboard/financial-sheet/financial-sheet.component';
import { InvoiceDetailsComponent } from './dashboard/financial-sheet/invoice-details/invoice-details.component';
import { PaymentAgingComponent } from './dashboard/financial-sheet/payment-aging/payment-aging.component';
import { CreditDebitMemoComponent } from './dashboard/financial-sheet/credit-debit-memo/credit-debit-memo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    SalesDataComponent,
    InquiryDataComponent,
    SalesOrderDataComponent,
    DeliveryListComponent,
    FinancialSheetComponent,
    InvoiceDetailsComponent,
    PaymentAgingComponent,
    CreditDebitMemoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
