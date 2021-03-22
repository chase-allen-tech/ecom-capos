import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessReturnComponent } from './process-return.component';

describe('ProcessReturnComponent', () => {
  let component: ProcessReturnComponent;
  let fixture: ComponentFixture<ProcessReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
