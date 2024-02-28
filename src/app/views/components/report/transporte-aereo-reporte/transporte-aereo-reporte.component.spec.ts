import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteAereoReporteComponent } from './transporte-aereo-reporte.component';

describe('TransporteAereoReporteComponent', () => {
  let component: TransporteAereoReporteComponent;
  let fixture: ComponentFixture<TransporteAereoReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporteAereoReporteComponent]
    });
    fixture = TestBed.createComponent(TransporteAereoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
