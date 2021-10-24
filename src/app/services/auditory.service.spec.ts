import { TestBed } from '@angular/core/testing';

import { AuditoryService } from './auditory.service';

describe('AuditoryService', () => {
  let service: AuditoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
