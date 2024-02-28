import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionElectricidadReporteComponent } from './generacion-electricidad-reporte.component';

describe('GeneracionElectricidadReporteComponent', () => {
  let component: GeneracionElectricidadReporteComponent;
  let fixture: ComponentFixture<GeneracionElectricidadReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneracionElectricidadReporteComponent]
    });
    fixture = TestBed.createComponent(GeneracionElectricidadReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
