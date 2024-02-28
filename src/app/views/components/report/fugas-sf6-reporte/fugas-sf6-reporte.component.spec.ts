import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FugasSf6ReporteComponent } from './fugas-sf6-reporte.component';

describe('FugasSf6ReporteComponent', () => {
  let component: FugasSf6ReporteComponent;
  let fixture: ComponentFixture<FugasSf6ReporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FugasSf6ReporteComponent]
    });
    fixture = TestBed.createComponent(FugasSf6ReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
