import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ProductComponent } from './component/product/product.component';
import { VendorComponent } from './component/vendor/vendor.component';
import { PurchaseOrderComponent } from './component/purchase-order/purchase-order.component';
import { PosComponent } from './component/pos/pos.component';
import { InvoiceComponent } from './component/invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'vendor',
    component: VendorComponent
  },
  {
    path: 'po',
    component: PurchaseOrderComponent
  },
  {
    path: 'pos',
    component: PosComponent
  },
  {
    path: 'invoice',
    component: InvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
