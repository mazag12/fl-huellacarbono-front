import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoAguaIngresarComponent } from './consumo-agua-ingresar.component';

describe('ConsumoAguaIngresarComponent', () => {
  let component: ConsumoAguaIngresarComponent;
  let fixture: ComponentFixture<ConsumoAguaIngresarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumoAguaIngresarComponent]
    });
    fixture = TestBed.createComponent(ConsumoAguaIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
