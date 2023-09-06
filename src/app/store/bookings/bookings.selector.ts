import { createSelector } from '@ngrx/store';
import { IBookingsState } from './bookings.reducer';
import { IAppState } from '../app.state';

export const selectBookingsState = (state: IAppState) => state.bookings;

export const selectMakeBookingStatus = createSelector(
  selectBookingsState,
  (state: IBookingsState) => state.makeBookingStatus
);
export const selectBookingError = createSelector(
  selectBookingsState,
  (state: IBookingsState) => state.error
);

export const selectAllBookings = createSelector(
  selectBookingsState,
  (state: IBookingsState) => state.bookings
);
