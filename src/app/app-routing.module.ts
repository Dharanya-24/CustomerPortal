import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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



const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard/sales-data', component: SalesDataComponent },
  { path: 'dashboard/inquiry-data', component: InquiryDataComponent },
  { path: 'dashboard/sales-data/sales-order-data', component: SalesOrderDataComponent },
  { path: 'dashboard/sales-data/delivery', component: DeliveryListComponent },
  { path: 'dashboard/financial-sheet', component: FinancialSheetComponent },
  { path: 'dashboard/financial-sheet/invoice-details', component: InvoiceDetailsComponent },
  { path: 'dashboard/financial-sheet/payment-aging', component: PaymentAgingComponent },
  { path: 'dashboard/financial-sheet/credit-debit-memo', component: CreditDebitMemoComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

