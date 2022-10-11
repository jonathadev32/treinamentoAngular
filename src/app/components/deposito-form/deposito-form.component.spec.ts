import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositoFormComponent } from './deposito-form.component';

describe('DepositoFormComponent', () => {
  let component: DepositoFormComponent;
  let fixture: ComponentFixture<DepositoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
