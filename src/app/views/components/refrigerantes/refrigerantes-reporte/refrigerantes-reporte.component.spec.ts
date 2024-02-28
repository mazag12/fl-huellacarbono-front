import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigerantesReporteComponent } from './refrigerantes-reporte.component';

describe('RefrigerantesReporteComponent', () => {
  let component: RefrigerantesReporteComponent;
  let fixture: ComponentFixture<RefrigerantesReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefrigerantesReporteComponent]
    });
    fixture = TestBed.createComponent(RefrigerantesReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
