import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BrandComponent} from './brand/brand.component';
import {PriceBooksComponent} from './price-books/price-books.component';
import {ProductTagComponent} from './product-tag/product-tag.component';
import {ProductTypeComponent} from './product-type/product-type.component';
import {StockControlComponent} from '../sotck-control/stock-control/stock-control.component';
import {SuppliersComponent} from './suppliers/suppliers.component';
import {ProductsComponent} from './products/products.component';
import {ProductAddComponent} from './products/product-add/product-add.component';
import {ProductImportComponent} from './products/product-import/product-import.component';
import {SupplierActionComponent} from './suppliers/supplier-action/supplier-action.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {OrderComponent} from '../sotck-control/stock-control/order/order.component';
import {ReturnComponent} from '../sotck-control/stock-control/return/return.component';
import {ReceiveComponent} from '../sotck-control/stock-control/receive/receive.component';
import {OrderDetailComponent} from '../sotck-control/stock-control/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product-add',
    component: ProductAddComponent,
  },
  {
    path: 'product-import',
    component: ProductImportComponent
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
  },
  {
    path: 'brand',
    component: BrandComponent
  },
  {
    path: 'price-books',
    component: PriceBooksComponent
  },
  {
    path: 'product-tag',
    component: ProductTagComponent
  },
  {
    path: 'product-type',
    component: ProductTypeComponent
  },
  {
    path: 'stock-control',
    component: StockControlComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'return',
    component: ReturnComponent
  },
  {
    path: 'receive',
    component: ReceiveComponent
  },
  {
    path: 'order-detail',
    component: OrderDetailComponent,
  },
  {
    path: 'supplier',
    component: SuppliersComponent
  },
  {
    path: 'supplier-action',
    component: SupplierActionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
