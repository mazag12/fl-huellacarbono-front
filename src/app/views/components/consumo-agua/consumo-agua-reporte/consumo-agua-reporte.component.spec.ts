import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoAguaReporteComponent } from './consumo-agua-reporte.component';

describe('ConsumoAguaReporteComponent', () => {
  let component: ConsumoAguaReporteComponent;
  let fixture: ComponentFixture<ConsumoAguaReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumoAguaReporteComponent]
    });
    fixture = TestBed.createComponent(ConsumoAguaReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
