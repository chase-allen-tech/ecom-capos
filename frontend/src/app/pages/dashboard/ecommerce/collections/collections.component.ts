import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastService } from '@app/_services/toast.service';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  pagaData=[];
  displayedColumns: string[] = ['select', 'collection', 'action', 'visible'];
  dataSource = new MatTableDataSource<ICollection>(this.pagaData);
  selection = new SelectionModel<ICollection>(true, []);

  constructor(
    private dialog: MatDialog,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  addCollection(collection){
    if(!collection){
      collection={
        id: 0,
        name: '',
        description: '',
        parent: 0,
        image: '',
        visible: true
      }
    }
    const dialogRef = this.dialog.open(EditCollectionComponent, {
      width: '600px',
      height: 'auto',
      maxHeight: '600px',
      data: {
        collection: collection, 
        action: 'add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data.push(result);
        this.toastService.showSuccess('Successfuly added new collection.', 'Add New Collection');
      }
    });
  }

  linkProduct(collection){

  }
}

interface ICollection{
  collection: any;
  visible: boolean;
}