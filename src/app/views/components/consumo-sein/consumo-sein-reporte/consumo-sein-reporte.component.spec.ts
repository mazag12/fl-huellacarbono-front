import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoSeinReporteComponent } from './consumo-sein-reporte.component';

describe('ConsumoSeinReporteComponent', () => {
  let component: ConsumoSeinReporteComponent;
  let fixture: ComponentFixture<ConsumoSeinReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumoSeinReporteComponent]
    });
    fixture = TestBed.createComponent(ConsumoSeinReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
