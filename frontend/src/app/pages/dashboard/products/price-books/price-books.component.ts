import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPriceBook } from '@app/_models/price-book';
import { ToastService } from '@app/_services/toast.service';
import { DeletePriceBookComponent } from './delete-price-book/delete-price-book.component';
import { EditPriceBookComponent } from './edit-price-book/edit-price-book.component';

@Component({
  selector: 'app-price-books',
  templateUrl: './price-books.component.html',
  styleUrls: ['./price-books.component.scss']
})
export class PriceBooksComponent implements OnInit {
  pageData:IPriceBook[]=[
    {
      id: 1,
      name: 'General Price Book',
      customerGroup: 'All Customers',
      outlet: 'All Outlets',
      validFrom: '-',
      validTo: '-',
      createdAt: '05 Oct 16 12:15 am'
    },
    {
      id: 1,
      name: 'General Price Book',
      customerGroup: 'All Customers',
      outlet: 'All Outlets',
      validFrom: '-',
      validTo: '-',
      createdAt: '05 Oct 16 12:15 am'
    },
    {
      id: 1,
      name: 'General Price Book',
      customerGroup: 'All Customers',
      outlet: 'All Outlets',
      validFrom: '-',
      validTo: '-',
      createdAt: '05 Oct 16 12:15 am'
    },
    {
      id: 1,
      name: 'General Price Book',
      customerGroup: 'All Customers',
      outlet: 'All Outlets',
      validFrom: '-',
      validTo: '-',
      createdAt: '05 Oct 16 12:15 am'
    }
  ];
  displayedColumns=[
    'name',
    'customerGroup',
    'outlet',
    'validFrom',
    'validTo',
    'createdAt',
    'action'
  ];
  constructor(
    private dialog: MatDialog,
    private toastService: ToastService

  ) { }

  ngOnInit(): void {
  }

  addPriceBook(){
    const dialogRef = this.dialog.open(EditPriceBookComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        pb: {
          name: '',
          customerGroup: '',
          outlet: '',
          validFrom: '',
          validTo: '',
          createdAt: '',
        },
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Successfuly added new price book.', 'Add New Price Book');
      }
    });
  }

  deletePriceBook(book){
    const dialogRef = this.dialog.open(DeletePriceBookComponent, {
      width: '600px', 
      height: 'auto',
      data: {
        pb: book
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result==='delete') {
        //TODO: delete order data
 
      }
    });
  }

  editPriceBook(book){
    const dialogRef = this.dialog.open(EditPriceBookComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        pb: book,
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pageData.push(result);
        this.toastService.showSuccess('Successfuly saved price book.', 'Edit Price Book');
      }
    });

  }
}
