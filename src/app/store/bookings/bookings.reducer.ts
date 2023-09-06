import { createReducer, on } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { BookingsActions } from './bookings.actions';
import { Status } from 'src/app/models/Status';
import { setTime } from 'src/app/utilities/setTime';

export interface IBookingsState {
  bookings: IBooking[];
  currentBooking: IBooking | null;
  error: string | null;
  getBookingsStatus: Status;
  makeBookingStatus: Status;
  selectedTime: string;
}

export const initialState: IBookingsState = {
  bookings: [],
  currentBooking: null,
  error: null,
  getBookingsStatus: Status.Idle,
  makeBookingStatus: Status.Idle,
  selectedTime: setTime(18),
};

export const BookingsReducer = createReducer(
  initialState,
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
    currentBooking: booking,
    makeBookingStatus: Status.Success,
  })),
  on(BookingsActions.resetMakeBookingStatus, (state) => ({
    ...state,
    makeBookingStatus: Status.Idle,
  })),
  on(BookingsActions.setTime, (state, { time, newDate }) => {
    if (newDate) return { ...state, selectedTime: setTime(time, newDate) };
    else {
      return {
        ...state,
        selectedTime: setTime(time),
      };
    }
  })
);
