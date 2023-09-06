import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBookingsState } from './bookings.reducer';

export const selectBookingsState = (state: IAppState) => state.bookings;

export const selectBookingStatus = createSelector(
  selectBookingsState,
  (state: IBookingsState) => state.status
);
export const selectBookingError = createSelector(
  selectBookingsState,
  (state: IBookingsState) => state.error
);