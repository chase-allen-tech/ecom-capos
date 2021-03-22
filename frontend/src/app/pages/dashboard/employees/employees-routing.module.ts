import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeComponent} from '@page/dashboard/employees/employee/employee.component';
import {GroupComponent} from '@page/dashboard/employees/group/group.component';
import {EmployeeActionComponent} from "@page/dashboard/employees/employee/employee-action/employee-action.component";
import {EmployeeImportComponent} from "@page/dashboard/employees/employee/employee-import/employee-import.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    pathMatch: 'full'
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'employee-action',
    component: EmployeeActionComponent
  },
  {
    path: 'group',
    component: GroupComponent
  },
  {
    path: 'employee-import',
    component: EmployeeImportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
