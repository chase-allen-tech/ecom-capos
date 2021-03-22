import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { OnlineStoreComponent } from './online-store/online-store.component';
import { ShareModule } from '@app/_shared/share.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductImportComponent } from './products/product-import/product-import.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RemoveItemDlgComponent } from './products/remove-item-dlg/remove-item-dlg.component';
import { NewItemDlgComponent } from './products/new-item-dlg/new-item-dlg.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { CollectionsComponent } from './collections/collections.component';
import { EditCollectionComponent } from './collections/edit-collection/edit-collection.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent, 
    OnlineStoreComponent,
    ProductsComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ProductImportComponent,
    RemoveItemDlgComponent,
    NewItemDlgComponent,
    OrdersComponent,
    CollectionsComponent,
    EditCollectionComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    FormsModule,
    EcommerceRoutingModule,
    NgSelectModule,
    UiSwitchModule,
    AngularEditorModule,
    MaterialFileInputModule
  ]
})
export class EcommerceModule { }
