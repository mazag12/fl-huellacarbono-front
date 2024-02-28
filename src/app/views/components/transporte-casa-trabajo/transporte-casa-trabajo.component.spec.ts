import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteCasaTrabajoComponent } from './transporte-casa-trabajo.component';

describe('TransporteCasaTrabajoComponent', () => {
  let component: TransporteCasaTrabajoComponent;
  let fixture: ComponentFixture<TransporteCasaTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporteCasaTrabajoComponent]
    });
    fixture = TestBed.createComponent(TransporteCasaTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
