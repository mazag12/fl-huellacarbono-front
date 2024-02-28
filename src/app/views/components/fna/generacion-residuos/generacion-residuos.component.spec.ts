import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionResiduosComponent } from './generacion-residuos.component';

describe('GeneracionResiduosComponent', () => {
  let component: GeneracionResiduosComponent;
  let fixture: ComponentFixture<GeneracionResiduosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneracionResiduosComponent]
    });
    fixture = TestBed.createComponent(GeneracionResiduosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
