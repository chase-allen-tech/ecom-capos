import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICashItem } from '@app/_models/cash-item';
import { ToastService } from '@app/_services/toast.service';
import { DeleteCashComponent } from './delete-cash/delete-cash.component';
import { EditCashComponent } from './edit-cash/edit-cash.component';

@Component({
  selector: 'app-cash-management',
  templateUrl: './cash-management.component.html',
  styleUrls: ['./cash-management.component.scss']
})
export class CashManagementComponent implements OnInit {
  columnsToDisplay = ['date', 'user', 'reasons', 'transaction', 'action'];

  cashData:ICashItem[]=[
    {
      date: '12/23/2020',
      user: 'xxx',
      reasons: 'so so so',
      transaction: 234.41,
    },
    {
      date: '12/23/2020',
      user: 'xxx',
      reasons: 'so so so',
      transaction: 234.41,
    },
    {
      date: '12/23/2020',
      user: 'xxx',
      reasons: 'so so so',
      transaction: 234.41,
    },
    {
      date: '12/23/2020',
      user: 'xxx',
      reasons: 'so so so',
      transaction: 234.41,

    },
    {
      date: '12/23/2020',
      user: 'xxx',
      reasons: 'so so so',
      transaction: 234.41,
    },

  ];
  constructor(
    private dialog: MatDialog,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  addCash(){
    const dialogRef = this.dialog.open(EditCashComponent, {
      width: '600px',
      height: 'auto',
      data: {
        cash: {
          date: '',
          user: '',
          reasons: '',
          transaction: 0
        }, 
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cashData.push(result);
        this.toastService.showSuccess('Successfuly added new cash.', 'Add New Cash');
      }
    });
  }

  editCash(cash){
    const dialogRef = this.dialog.open(EditCashComponent, {
      width: '600px',
      height: 'auto',
      data: {
        cash: cash, 
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cashData.push(result);
        this.toastService.showSuccess('Error occurred while saving changes.', 'Edit Cash');
      }
    });
  }

  deleteCash(cash){
    const dialogRef = this.dialog.open(DeleteCashComponent, {
      width: '600px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==='delete') {
        //TODO: delete cash data

      }
    });
  }

}
