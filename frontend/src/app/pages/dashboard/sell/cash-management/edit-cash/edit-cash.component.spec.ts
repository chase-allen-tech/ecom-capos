import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCashComponent } from './edit-cash.component';

describe('EditCashComponent', () => {
  let component: EditCashComponent;
  let fixture: ComponentFixture<EditCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
