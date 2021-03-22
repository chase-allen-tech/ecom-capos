import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesTaxComponent } from './edit-sales-tax.component';

describe('EditSalesTaxComponent', () => {
  let component: EditSalesTaxComponent;
  let fixture: ComponentFixture<EditSalesTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSalesTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalesTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
