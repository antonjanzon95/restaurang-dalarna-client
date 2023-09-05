import { createReducer, on } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { BookingsActions } from './bookings.actions';

enum BookingsStatus {
  Idle,
  Pending,
  Success,
  Error,
}

export interface IBookingsState {
  bookings: IBooking[];
  error: any;
  status: BookingsStatus;
}

export const initialState: IBookingsState = {
  bookings: [],
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
    status: BookingsStatus.Error
  })),
  on(BookingsActions.getBookingsSuccess, (state, action) => ({...state, bookings: action.bookings, error: null, status: BookingsStatus.Success}))
);
