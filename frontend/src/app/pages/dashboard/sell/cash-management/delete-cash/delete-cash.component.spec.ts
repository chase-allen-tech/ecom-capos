import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCashComponent } from './delete-cash.component';

describe('DeleteCashComponent', () => {
  let component: DeleteCashComponent;
  let fixture: ComponentFixture<DeleteCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
