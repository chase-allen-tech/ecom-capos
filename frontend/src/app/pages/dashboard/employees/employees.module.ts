import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeComponent } from './employee/employee.component';
import { GroupComponent } from './group/group.component';
import { EmployeeImportComponent } from './employee/employee-import/employee-import.component';
import {ShareModule} from '@shared/share.module';
import { EmployeeActionComponent } from './employee/employee-action/employee-action.component';
import { PayAccountDlgComponent } from './employee/pay-account-dlg/pay-account-dlg.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { DeleteGroupComponent } from './group/delete-group/delete-group.component';


@NgModule({
  declarations: [
    EmployeeComponent, 
    GroupComponent, 
    EmployeeImportComponent, 
    EmployeeActionComponent, 
    PayAccountDlgComponent,
    EditGroupComponent,
    DeleteGroupComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ShareModule
  ]
})
export class EmployeesModule { }
