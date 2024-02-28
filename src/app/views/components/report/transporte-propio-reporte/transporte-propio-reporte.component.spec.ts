import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportePropioReporteComponent } from './transporte-propio-reporte.component';

describe('TransportePropioReporteComponent', () => {
  let component: TransportePropioReporteComponent;
  let fixture: ComponentFixture<TransportePropioReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportePropioReporteComponent]
    });
    fixture = TestBed.createComponent(TransportePropioReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
