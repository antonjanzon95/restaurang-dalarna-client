import { createAction, props } from '@ngrx/store';
import { IBooking } from '../../models/IBooking';

export const BookingsActions = {
  getBookings: createAction('[Bookings] Get Bookings'),
  getBookingsFailure: createAction(
    '[Bookings] Get Bookings Failure',
    props<{ err: string }>()
  ),
  getBookingsSuccess: createAction(
    '[Bookings] Get Bookings Success',
    props<{ bookings: IBooking[] }>()
  ),
};
