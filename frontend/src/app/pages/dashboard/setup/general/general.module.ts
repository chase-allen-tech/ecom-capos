import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { StoreSettingsComponent } from './store-settings/store-settings.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { AddressComponent } from './address/address.component';
import { ShareModule } from '@app/_shared/share.module';
import { FormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [StoreSettingsComponent, ContactInfoComponent, AddressComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    GeneralRoutingModule,
    MaterialFileInputModule

  ]
})
export class GeneralModule { }
