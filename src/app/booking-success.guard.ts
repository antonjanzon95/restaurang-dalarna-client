import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BookingService } from './services/booking/booking.service';
import { map } from 'rxjs';

export const bookingSuccessGuard: CanActivateFn = (route, state) => {
  const bookingService = inject(BookingService);
  return bookingService.bookingSuccessGuard().pipe(map((latestBooking) => !!latestBooking))
};
