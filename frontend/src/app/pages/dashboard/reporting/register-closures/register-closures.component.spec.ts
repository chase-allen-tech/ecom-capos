import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClosuresComponent } from './register-closures.component';

describe('RegisterClosuresComponent', () => {
  let component: RegisterClosuresComponent;
  let fixture: ComponentFixture<RegisterClosuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterClosuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClosuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
