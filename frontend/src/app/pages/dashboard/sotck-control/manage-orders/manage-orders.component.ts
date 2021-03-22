import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IOrder } from '@app/_models/order';
import { ToastService } from '@app/_services/toast.service';
import { DeleteOrderComponent } from './delete-order/delete-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  keyword='';
  pageData:IOrder[]=[
    {    
      billNo: 1,
      supplier: 'xx yy',
      phone: '+7443-245-223',
      dateTime: '12/12/2323',
      totalProducts: 234,
      totalAmount: 333,
      paidStatus: 'sss'
    },
    {    
      billNo: 2,
      supplier: 'xx yy',
      phone: '+7443-245-223',
      dateTime: '12/12/2323',
      totalProducts: 234,
      totalAmount: 333,
      paidStatus: 'sss'
    },
    {    
      billNo: 3,
      supplier: 'xx yy',
      phone: '+7443-245-223',
      dateTime: '12/12/2323',
      totalProducts: 234,
      totalAmount: 333,
      paidStatus: 'sss'
    },
    {    
      billNo: 4,
      supplier: 'xx yy',
      phone: '+7443-245-223',
      dateTime: '12/12/2323',
      totalProducts: 234,
      totalAmount: 333,
      paidStatus: 'sss'
    },
    {    
      billNo: 5,
      supplier: 'xx yy',
      phone: '+7443-245-223',
      dateTime: '12/12/2323',
      totalProducts: 234,
      totalAmount: 333,
      paidStatus: 'sss'
    },

  ];
  displayedColumns=[
    'billNo', 'supplier', 'phone', 'dateTime', 
    'totalProducts', 'totalAmount', 'paidStatus', 'action'
  ];
  constructor(
    private dialog: MatDialog,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }

  search(){

  }

  addOrder(){
    const dialogRef = this.dialog.open(EditOrderComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        order: {
          billNo: 0,
          supplier: '',
          phone: '',
          dateTime: '',
          totalProducts: 0,
          totalAmount: 0,
          paidStatus: 0
        }, 
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Successfuly added new order.', 'Add New Order');
      }
    });
  }

  editOrder(order){
    const dialogRef = this.dialog.open(EditOrderComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        order: order, 
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Error occurred while saving changes.', 'Edit Order');
      }
    });
  }

  deleteOrder(order){
    const dialogRef = this.dialog.open(DeleteOrderComponent, {
      width: '600px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==='delete') {
        //TODO: delete order data

      }
    });
  }

}
