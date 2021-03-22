import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnlineStoreComponent } from './online-store/online-store.component';
import { DetailComponent } from './orders/detail/detail.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductImportComponent } from './products/product-import/product-import.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'collections',
    component: CollectionsComponent
  },
  {
    path: 'product',
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
    path: 'orders',
    component: OrdersComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>import('./orders/orders.module').then(m => m.OrdersModule)
      }
    ]
  },
  {
    path: 'orders/detail',
    component: DetailComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>import('./settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  },
  {
    path: 'online-store',
    component: OnlineStoreComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
