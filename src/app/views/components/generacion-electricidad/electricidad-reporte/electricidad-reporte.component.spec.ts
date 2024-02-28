import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricidadReporteComponent } from './electricidad-reporte.component';

describe('ElectricidadReporteComponent', () => {
  let component: ElectricidadReporteComponent;
  let fixture: ComponentFixture<ElectricidadReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricidadReporteComponent]
    });
    fixture = TestBed.createComponent(ElectricidadReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
