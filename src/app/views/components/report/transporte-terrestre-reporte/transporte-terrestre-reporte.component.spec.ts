import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteTerrestreReporteComponent } from './transporte-terrestre-reporte.component';

describe('TransporteTerrestreReporteComponent', () => {
  let component: TransporteTerrestreReporteComponent;
  let fixture: ComponentFixture<TransporteTerrestreReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporteTerrestreReporteComponent]
    });
    fixture = TestBed.createComponent(TransporteTerrestreReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
