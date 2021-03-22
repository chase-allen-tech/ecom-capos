import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { GeneralComponent } from './general/general.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { EditOutletComponent } from './outlet-registers/edit-outlet/edit-outlet.component';
import { OutletRegistersComponent } from './outlet-registers/outlet-registers.component';
import { PaymentTypesComponent } from './payment-types/payment-types.component';
import { RegisterPlanComponent } from './register-plan/register-plan.component';
import { SalesTaxesComponent } from './sales-taxes/sales-taxes.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full'
  },
  {
    path: 'general',
    component: GeneralComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>import('./general/general.module').then(m => m.GeneralModule)
      }
    ]
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'register-plan',
    component: RegisterPlanComponent
  },

  {
    path: 'outlets',
    component: OutletRegistersComponent
  },
  {
    path: 'outlets/edit-outlet',
    component: EditOutletComponent
  },

  {
    path: 'payment-types',
    component: PaymentTypesComponent
  },
  {
    path: 'sales-taxes',
    component: SalesTaxesComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        loadChildren: ()=>import('./users/users.module').then(m => m.UsersModule)
      }
    ]
  },
  {
    path: 'message-box',
    component: MessageBoxComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
