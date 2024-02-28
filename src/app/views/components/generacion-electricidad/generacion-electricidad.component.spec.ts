import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionElectricidadComponent } from './generacion-electricidad.component';

describe('GeneracionElectricidadComponent', () => {
  let component: GeneracionElectricidadComponent;
  let fixture: ComponentFixture<GeneracionElectricidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneracionElectricidadComponent]
    });
    fixture = TestBed.createComponent(GeneracionElectricidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
