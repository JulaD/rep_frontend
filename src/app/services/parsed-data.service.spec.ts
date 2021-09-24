import { TestBed } from '@angular/core/testing';

import { ParsedDataService } from './parsed-data.service';

describe('ParsedDataService', () => {
  let service: ParsedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParsedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
