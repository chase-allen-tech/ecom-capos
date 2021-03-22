import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { StoreSettingsComponent } from './store-settings/store-settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full'
  },
  {
    path: 'store',
    component: StoreSettingsComponent
  },
  {
    path: 'contact',
    component: ContactInfoComponent
  },
  {
    path: 'address',
    component: AddressComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
