import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteInsumosReporteComponent } from './transporte-insumos-reporte.component';

describe('TransporteInsumosReporteComponent', () => {
  let component: TransporteInsumosReporteComponent;
  let fixture: ComponentFixture<TransporteInsumosReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporteInsumosReporteComponent]
    });
    fixture = TestBed.createComponent(TransporteInsumosReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
