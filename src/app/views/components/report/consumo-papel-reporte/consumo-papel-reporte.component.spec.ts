import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoPapelReporteComponent } from './consumo-papel-reporte.component';

describe('ConsumoPapelReporteComponent', () => {
  let component: ConsumoPapelReporteComponent;
  let fixture: ComponentFixture<ConsumoPapelReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumoPapelReporteComponent]
    });
    fixture = TestBed.createComponent(ConsumoPapelReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
