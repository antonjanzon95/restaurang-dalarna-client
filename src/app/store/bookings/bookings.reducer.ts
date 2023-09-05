import { createReducer, on } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { BookingsActions } from './bookings.actions';

export enum BookingsStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

export interface IBookingsState {
  bookings: IBooking[];
  currentBooking: IBooking | null;
  error: string | null;
  status: BookingsStatus;
}

export const initialState: IBookingsState = {
  bookings: [],
  currentBooking: null,
  error: null,
  status: BookingsStatus.Idle,
};

export const BookingsReducer = createReducer(
  initialState,
  on(BookingsActions.getBookings, (state) => ({
    ...state,
    status: BookingsStatus.Pending,
  })),
  on(BookingsActions.getBookingsFailure, (state, action) => ({
    ...state,
    error: action.err,
    status: BookingsStatus.Error,
  })),
  on(BookingsActions.getBookingsSuccess, (state, action) => ({
    ...state,
    bookings: action.bookings,
    error: null,
    status: BookingsStatus.Success,
  })),
  on(BookingsActions.makeBooking, (state) => ({
    ...state,
    status: BookingsStatus.Pending,
  })),
  on(BookingsActions.makeBookingFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: BookingsStatus.Error,
  })),
  on(BookingsActions.makeBookingSuccess, (state, { booking }) => ({
    ...state,
    currentBooking: booking,
    status: BookingsStatus.Success,
  }))
);
