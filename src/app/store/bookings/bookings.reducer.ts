import { createReducer, on } from '@ngrx/store';
import { IBooking, IBookingResponse } from 'src/app/models/IBooking';
import { BookingsActions } from './bookings.actions';
import { Status } from 'src/app/models/Status';

export interface IBookingsState {
  bookings: IBookingResponse[];
  currentBooking: IBookingResponse | null;
  error: string | null;
  getBookingsStatus: Status;
  makeBookingStatus: Status;
}

export const initialState: IBookingsState = {
  bookings: [],
  currentBooking: null,
  error: null,
  getBookingsStatus: Status.Idle,
  makeBookingStatus: Status.Idle,
};

export const BookingsReducer = createReducer(
  initialState,
  // All
  on(BookingsActions.getBookings, (state) => ({
    ...state,
    getBookingsStatus: Status.Pending,
  })),
  on(BookingsActions.getBookingsFailure, (state, action) => ({
    ...state,
    error: action.err,
    getBookingsStatus: Status.Error,
  })),
  on(BookingsActions.getBookingsSuccess, (state, action) => ({
    ...state,
    bookings: action.bookings,
    error: null,
    getBookingsStatus: Status.Success,
  })),

  // By date
  on(BookingsActions.getBookingsByDate, (state) => ({
    ...state,
    getBookingsStatus: Status.Pending,
  })),
  on(BookingsActions.getBookingsByDateFailure, (state, { error }) => ({
    ...state,
    error: error,
    getBookingsStatus: Status.Error,
  })),
  on(BookingsActions.getBookingsByDateSuccess, (state, { bookings }) => ({
    ...state,
    error: null,
    bookings: bookings,
    getBookingsStatus: Status.Pending,
  })),

  // By month
  on(BookingsActions.getBookingsByMonth, (state) => ({
    ...state,
    getBookingsStatus: Status.Pending,
  })),
  on(BookingsActions.getBookingsByMonthFailure, (state, { error }) => ({
    ...state,
    error: error,
    getBookingsStatus: Status.Error,
  })),
  on(BookingsActions.getBookingsByMonthSuccess, (state, { bookings }) => ({
    ...state,
    error: null,
    bookings: bookings,
    getBookingsStatus: Status.Pending,
  })),

  // Set/Reset current booking
  on(BookingsActions.setCurrentBooking, (state, { bookingId }) => {
    const currentBooking = state.bookings.find(
      (booking) => booking._id === bookingId
    );
    return {
      ...state,
      currentBooking: currentBooking || null,
    };
  }),
  on(BookingsActions.resetCurrentBooking, (state) => ({
    ...state,
    currentBooking: null,
  })),

  // Make bookings
  on(BookingsActions.makeBooking, (state) => ({
    ...state,
    makeBookingStatus: Status.Pending,
  })),
  on(BookingsActions.makeBookingFailure, (state, { error }) => ({
    ...state,
    error: error,
    makeBookingStatus: Status.Error,
  })),
  on(BookingsActions.makeBookingSuccess, (state, { booking }) => ({
    ...state,
    error: null,
    currentBooking: booking,
    makeBookingStatus: Status.Success,
  })),

  // Reset status
  on(BookingsActions.resetMakeBookingStatus, (state) => ({
    ...state,
    makeBookingStatus: Status.Idle,
  }))
);
