import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { PriceBooksComponent } from './price-books/price-books.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { BrandComponent } from './brand/brand.component';
import { ProductTagComponent } from './product-tag/product-tag.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import {ShareModule} from '@shared/share.module';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {NgSelectModule} from '@ng-select/ng-select';
import { NewItemDlgComponent } from './new-item-dlg/new-item-dlg.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductImportComponent } from './products/product-import/product-import.component';
import { TagDlgComponent } from './product-tag/tag-dlg/tag-dlg.component';
import { BrandDlgComponent } from './brand/brand-dlg/brand-dlg.component';
import { TypeDlgComponent } from './product-type/type-dlg/type-dlg.component';
import { SupplierDlgComponent } from './suppliers/supplier-dlg/supplier-dlg.component';
import { SupplierActionComponent } from './suppliers/supplier-action/supplier-action.component';
import { RemoveItemDlgComponent } from './remove-item-dlg/remove-item-dlg.component';
import { OrderComponent } from '../sotck-control/stock-control/order/order.component';
import { ReceiveComponent } from '../sotck-control/stock-control/receive/receive.component';
import { ReturnComponent } from '../sotck-control/stock-control/return/return.component';
import { OrderDetailComponent } from '../sotck-control/stock-control/order-detail/order-detail.component';
import { RouterModule } from '@angular/router';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { DeletePriceBookComponent } from './price-books/delete-price-book/delete-price-book.component';
import { EditPriceBookComponent } from './price-books/edit-price-book/edit-price-book.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    PriceBooksComponent, 
    ProductTypeComponent,
    SuppliersComponent, 
    BrandComponent, 
    ProductTagComponent, 
    ProductAddComponent,
    NewItemDlgComponent, 
    ProductDetailComponent, 
    ProductImportComponent, 
    TagDlgComponent,
    BrandDlgComponent, 
    TypeDlgComponent, 
    SupplierDlgComponent, 
    SupplierActionComponent, 
    RemoveItemDlgComponent,
    OrderComponent, 
    ReceiveComponent, 
    ReturnComponent, 
    OrderDetailComponent,
    DeletePriceBookComponent, 
    EditPriceBookComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ShareModule,
    AngularEditorModule,
    NgSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    RouterModule,
    MaterialFileInputModule
  ]
})
export class ProductsModule { }
