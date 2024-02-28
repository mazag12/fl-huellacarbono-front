import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoPapelComponent } from './consumo-papel.component';

describe('ConsumoPapelComponent', () => {
  let component: ConsumoPapelComponent;
  let fixture: ComponentFixture<ConsumoPapelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumoPapelComponent]
    });
    fixture = TestBed.createComponent(ConsumoPapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
