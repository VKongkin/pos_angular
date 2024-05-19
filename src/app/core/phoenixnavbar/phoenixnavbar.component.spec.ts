import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoenixnavbarComponent } from './phoenixnavbar.component';

describe('PhoenixnavbarComponent', () => {
  let component: PhoenixnavbarComponent;
  let fixture: ComponentFixture<PhoenixnavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoenixnavbarComponent]
    });
    fixture = TestBed.createComponent(PhoenixnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
