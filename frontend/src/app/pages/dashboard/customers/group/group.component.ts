import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICustomerGroup } from '@app/_models/customer-group';
import { ToastService } from '@app/_services/toast.service';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { EditGroupComponent } from './edit-group/edit-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  pageData:ICustomerGroup[]=[
    {
      name: 'Our',
      createdDate: '12/11/2020'
    },
    {
      name: 'Them',
      createdDate: '12/11/2020'
    },
    {
      name: 'XXxx',
      createdDate: '12/11/2020'
    },
    {
      name: 'Our',
      createdDate: '12/11/2020'
    },
    {
      name: 'Our',
      createdDate: '12/11/2020'
    },

  ]
  displayedColumns=['name', 'createdDate', 'action'];
  constructor(
    private dialog: MatDialog,
    private toastService: ToastService

  ) { }

  ngOnInit(): void {
  }

  addGroup(){
    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        group: {
          name: '',
          createdDate: '',
        }, 
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Successfuly added new group.', 'Add New Group');
      }
    });
  }

  deleteGroup(group){
    const dialogRef = this.dialog.open(DeleteGroupComponent, {
      width: '600px',
      height: 'auto',
      data: {
        group: group
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==='delete') {
        //TODO: delete order data

      }
    });
  }

  editGroup(group){
    const dialogRef = this.dialog.open(EditGroupComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        group: group, 
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Error occurred while saving changes.', 'Edit Group');
      }
    });
  }

}
