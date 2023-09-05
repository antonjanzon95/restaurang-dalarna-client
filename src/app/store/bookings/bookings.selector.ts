import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IBooking } from "src/app/models/IBooking";
import { IBookingsState } from "./bookings.reducer";
import { IAppState } from "../app.state";

// export const selectBookings = createFeatureSelector<IBooking[]>('bookings');

export const selectBookings = (state: IAppState) => state.bookings;

export const selectAllBookings = createSelector(selectBookings, (state: IBookingsState) => state.bookings)