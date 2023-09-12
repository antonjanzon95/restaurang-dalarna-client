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
    props<{ time: string }>()
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
  setCurrentBookingWithDetails: createAction(
    '[Bookings Effects] Set Current Booking with booking details as parameter',
    props<{ bookingDetails: IBookingResponse }>()
  ),

  // Make booking
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

  // Delete booking
  deleteBooking: createAction(
    '[Admin Booking Information Page] Delete Booking',
    props<{ bookingId: string }>()
  ),
  deleteBookingFailure: createAction(
    '[Admin Booking Information Page] Delete Booking Failure',
    props<{ error: string }>()
  ),
  deleteBookingSuccess: createAction(
    '[Admin Booking Information Page] Delete Booking Success',
    props<{ deletedId: string }>()
  ),

  updateBooking: createAction(
    '[Modify Booking] Update Booking',
    props<{ bookingDetails: IBookingResponse }>()
  ),
  updateBookingFailure: createAction(
    '[Modify Booking] Update Booking Failure',
    props<{ error: string }>()
  ),
  updateBookingSuccess: createAction(
    '[Modify Booking] Update Booking Success',
    props<{ bookingDetails: IBookingResponse }>()
  ),

  // Reset status
  resetMakeBookingStatus: createAction(
    '[Booking Form] Reset Make Booking Status'
  ),
  setTime: createAction(
    '[Tables] Set Time',
    props<{ time: number; newDate?: Date | null }>()
  ),
  setLatestBooking: createAction(
    '[Booking Form] Set latest booking',
    props<{ bookingDetails: IBooking }>()
  ),
};
