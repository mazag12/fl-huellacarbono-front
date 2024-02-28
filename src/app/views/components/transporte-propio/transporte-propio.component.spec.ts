import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportePropioComponent } from './transporte-propio.component';

describe('TransportePropioComponent', () => {
  let component: TransportePropioComponent;
  let fixture: ComponentFixture<TransportePropioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportePropioComponent]
    });
    fixture = TestBed.createComponent(TransportePropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
