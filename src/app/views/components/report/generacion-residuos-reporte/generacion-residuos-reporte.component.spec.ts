import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionResiduosReporteComponent } from './generacion-residuos-reporte.component';

describe('GeneracionResiduosReporteComponent', () => {
  let component: GeneracionResiduosReporteComponent;
  let fixture: ComponentFixture<GeneracionResiduosReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneracionResiduosReporteComponent]
    });
    fixture = TestBed.createComponent(GeneracionResiduosReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
