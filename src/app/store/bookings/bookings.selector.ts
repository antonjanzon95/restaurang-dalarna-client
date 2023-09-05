import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBookingsState } from './bookings.reducer';

export const selectBookings = createFeatureSelector<IBookingsState>('bookings');

export const selectBookingStatus = createSelector(
  selectBookings,
  (state: IBookingsState) => state.status
);
export const selectBookingError = createSelector(
  selectBookings,
  (state: IBookingsState) => state.error
);
