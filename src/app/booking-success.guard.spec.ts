import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { bookingSuccessGuard } from './booking-success.guard';

describe('bookingSuccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => bookingSuccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
