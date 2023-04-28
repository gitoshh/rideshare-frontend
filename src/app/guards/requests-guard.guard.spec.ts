import { TestBed } from '@angular/core/testing';

import { RequestsGuard } from './requests-guard.service';

describe('RequestsGuardGuard', () => {
  let guard: RequestsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RequestsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
