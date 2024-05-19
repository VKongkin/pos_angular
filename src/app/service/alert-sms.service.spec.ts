import { TestBed } from '@angular/core/testing';

import { AlertSmsService } from './alert-sms.service';

describe('AlertSmsService', () => {
  let service: AlertSmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertSmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
