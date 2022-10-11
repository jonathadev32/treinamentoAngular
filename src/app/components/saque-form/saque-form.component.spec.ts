import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaqueFormComponent } from './saque-form.component';

describe('SaqueFormComponent', () => {
  let component: SaqueFormComponent;
  let fixture: ComponentFixture<SaqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaqueFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
