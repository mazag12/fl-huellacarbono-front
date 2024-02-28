import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoSeinComponent } from './consumo-sein.component';

describe('ConsumoSeinComponent', () => {
  let component: ConsumoSeinComponent;
  let fixture: ComponentFixture<ConsumoSeinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumoSeinComponent]
    });
    fixture = TestBed.createComponent(ConsumoSeinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
