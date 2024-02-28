import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteInsumosComponent } from './transporte-insumos.component';

describe('TransporteInsumosComponent', () => {
  let component: TransporteInsumosComponent;
  let fixture: ComponentFixture<TransporteInsumosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporteInsumosComponent]
    });
    fixture = TestBed.createComponent(TransporteInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
