import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricidadIngresarComponent } from './electricidad-ingresar.component';

describe('ElectricidadIngresarComponent', () => {
  let component: ElectricidadIngresarComponent;
  let fixture: ComponentFixture<ElectricidadIngresarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectricidadIngresarComponent]
    });
    fixture = TestBed.createComponent(ElectricidadIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
