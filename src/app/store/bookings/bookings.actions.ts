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
  makeBooking: createAction(
    '[Booking Form] Make New Booking',
    props<{ bookingDetails: IBooking }>()
  ),
  makeBookingFailure: createAction(
    '[Booking Form] Make New Booking Failure',
    props<{ error: string }>()
  ),
  makeBookingSuccess: createAction(
    '[Booking Form] Make New Booking Success',
    props<{ booking: IBooking }>()
  ),
  resetMakeBookingStatus: createAction(
    '[Booking Form] Reset Make Booking Status'
  ),
  setTime: createAction(
    '[Tables] Set Time',
    props<{ time: number; newDate?: string }>()
  ),
};
