import { TestBed } from '@angular/core/testing';

import { NotSavedGuardGuard } from './not-saved-guard.guard';

describe('NotSavedGuardGuard', () => {
  let guard: NotSavedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotSavedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
