import { TestBed } from '@angular/core/testing';

import { ChangeObserversService } from './change-observers.service';

describe('ChangeObserversService', () => {
  let service: ChangeObserversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeObserversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
