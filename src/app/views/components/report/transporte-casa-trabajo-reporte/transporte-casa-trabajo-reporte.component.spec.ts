import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteCasaTrabajoReporteComponent } from './transporte-casa-trabajo-reporte.component';

describe('TransporteCasaTrabajoReporteComponent', () => {
  let component: TransporteCasaTrabajoReporteComponent;
  let fixture: ComponentFixture<TransporteCasaTrabajoReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporteCasaTrabajoReporteComponent]
    });
    fixture = TestBed.createComponent(TransporteCasaTrabajoReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
