import { IBooking } from '../../models/IBooking';
import { createReducer, on } from '@ngrx/store';
import { BookingActions } from './booking.actions';
import { state } from '@angular/animations';
import { ITable } from 'src/app/models/ITable';

export interface IBookingState {
  tables: ITable[] | null;
  error: string | null;
  status: Status
}

enum Status {
  Idle,
  Pending,
  Success,
  Error
}

export const initialState: IBookingState = {
  tables: null,
  error: null,
  status: Status.Idle,
};

export const bookingReducer = createReducer(
  initialState,
  on(BookingActions.getBookings, (state) => ({
    ...state,
    status: Status.Pending
  })),
  on(BookingActions.getBookingsFailure, (state, { error }) => ({
    ...state,
    error,
    status: Status.Error
  })),
  on(BookingActions.getBookingsSuccess, (state, { tables }) => ({
    ...state,
    error: null,
    tables: tables,
    status: Status.Success
  }))
);
