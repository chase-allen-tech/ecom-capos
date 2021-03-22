import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { ClosedComponent } from './closed/closed.component';
import { DetailComponent } from './detail/detail.component';
import { OpenComponent } from './open/open.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'open',
    pathMatch: 'full'
  },
  {
    path: 'open',
    component: OpenComponent
  },
  {
    path: 'closed',
    component: ClosedComponent
  },
  {
    path: 'all',
    component: AllComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
