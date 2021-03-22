import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '@app/_services/toast.service';
import { EditSalesTaxComponent } from './edit-sales-tax/edit-sales-tax.component';

@Component({
  selector: 'app-sales-taxes',
  templateUrl: './sales-taxes.component.html',
  styleUrls: ['./sales-taxes.component.scss']
})
export class SalesTaxesComponent implements OnInit {
  salesTaxes=[
    {
      name: 'Tax 1',
      rate: 2
    },
    {
      name: 'Tax 2',
      rate: 10
    },
    {
      name: 'Tax 3',
      rate: 10
    },
    {
      name: 'Tax 4',
      rate: 10
    },
    {
      name: 'Tax 5',
      rate: 10
    },
  ];
  salesTaxColumns=['name', 'rate'];

  outletTaxes=[
    {
      outlet: 'Outlet 1',
      tax: 'Tax A'
    },
    {
      outlet: 'Outlet 2',
      tax: 'Tax B'
    },
    {
      outlet: 'Outlet 3',
      tax: 'Tax C'
    },
    {
      outlet: 'Outlet 4',
      tax: 'Tax D'
    },
    {
      outlet: 'Outlet 5',
      tax: 'Tax E'
    },

  ];
  outletTaxColumns=['outlet', 'tax'];

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  addSalesTaxes(){
    const dialogRef = this.dialog.open(EditSalesTaxComponent, {
      width: '600px',
      height: 'auto',
      data: {
        tax: {
          name: '',
          rate: 0,
        }, 
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salesTaxes.push(result);
        this.toastService.showSuccess('Successfuly added new group.', 'Add New Group');
      }
    });
  }
}
