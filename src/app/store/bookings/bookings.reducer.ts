import { createReducer, on } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { BookingsActions } from './bookings.actions';
import { Status } from 'src/app/models/Status';

export interface IBookingsState {
  bookings: IBooking[];
  error: any;
  status: Status;
}

export const initialState: IBookingsState = {
  bookings: [],
  error: null,
  status: Status.Idle,
};

export const BookingsReducer = createReducer(
  initialState,
  on(BookingsActions.getBookings, (state) => ({
    ...state,
    status: Status.Pending,
  })),
  on(BookingsActions.getBookingsFailure, (state, action) => ({
    ...state,
    error: action.err,
    status: Status.Error
  })),
  on(BookingsActions.getBookingsSuccess, (state, action) => ({...state, bookings: action.bookings, error: null, status: Status.Success}))
);
