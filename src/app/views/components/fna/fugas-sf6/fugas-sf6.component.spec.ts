import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FugasSf6Component } from './fugas-sf6.component';

describe('FugasSf6Component', () => {
  let component: FugasSf6Component;
  let fixture: ComponentFixture<FugasSf6Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FugasSf6Component]
    });
    fixture = TestBed.createComponent(FugasSf6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
