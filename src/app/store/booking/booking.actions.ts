import { createAction, props } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { ITable } from 'src/app/models/ITable';

export const BookingActions = {
  getBookings: createAction('[Booking Modal] Get Bookings'),
  getBookingsFailure: createAction(
    '[Booking Modal] Get Bookings Failure',
    props<{ error: string }>()
  ),
  getBookingsSuccess: createAction(
    '[Booking Modal] Get Bookings Success',
    props<{ tables: ITable[] }>()
  ),
};
