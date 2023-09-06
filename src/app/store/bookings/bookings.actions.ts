import { createAction, props } from '@ngrx/store';
import { IBooking, IBookingResponse } from '../../models/IBooking';

export const BookingsActions = {
  // Get bookings actions
  // All
  getBookings: createAction('[Bookings] Get Bookings'),
  getBookingsFailure: createAction(
    '[Bookings] Get Bookings Failure',
    props<{ err: string }>()
  ),
  getBookingsSuccess: createAction(
    '[Bookings] Get Bookings Success',
    props<{ bookings: IBookingResponse[] }>()
  ),

  // By date
  getBookingsByDate: createAction(
    '[Bookings] Get Bookings By Date',
    props<{ date: Date }>()
  ),
  getBookingsByDateFailure: createAction(
    '[Bookings] Get Bookings By Date Failure',
    props<{ error: string }>()
  ),
  getBookingsByDateSuccess: createAction(
    '[Bookings] Get Bookings By Date Success',
    props<{ bookings: IBookingResponse[] }>()
  ),

  // By month
  getBookingsByMonth: createAction(
    '[Bookings] Get Bookings By Month',
    props<{ monthNumber: number }>()
  ),
  getBookingsByMonthFailure: createAction(
    '[Bookings] Get Bookings By Month Failure',
    props<{ error: string }>()
  ),
  getBookingsByMonthSuccess: createAction(
    '[Bookings] Get Bookings By Month Success',
    props<{ bookings: IBookingResponse[] }>()
  ),

  // Set/Reset current booking
  setCurrentBooking: createAction(
    '[Admin Page] Set Current Booking',
    props<{ bookingId: string }>()
  ),
  resetCurrentBooking: createAction('[Admin Page] Reset Current Booking'),

  // Make booking actions
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
    props<{ booking: IBookingResponse }>()
  ),

  // Reset status
  resetMakeBookingStatus: createAction(
    '[Booking Form] Reset Make Booking Status'
  ),
};
