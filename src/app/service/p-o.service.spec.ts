import { TestBed } from '@angular/core/testing';

import { POService } from './p-o.service';

describe('POService', () => {
  let service: POService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(POService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
