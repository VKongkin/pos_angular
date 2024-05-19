import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoenixfooterComponent } from './phoenixfooter.component';

describe('PhoenixfooterComponent', () => {
  let component: PhoenixfooterComponent;
  let fixture: ComponentFixture<PhoenixfooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoenixfooterComponent]
    });
    fixture = TestBed.createComponent(PhoenixfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
