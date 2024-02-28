import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteAereoComponent } from './transporte-aereo.component';

describe('TransporteAereoComponent', () => {
  let component: TransporteAereoComponent;
  let fixture: ComponentFixture<TransporteAereoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporteAereoComponent]
    });
    fixture = TestBed.createComponent(TransporteAereoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
