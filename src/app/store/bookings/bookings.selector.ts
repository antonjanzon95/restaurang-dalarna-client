import { createFeatureSelector } from "@ngrx/store";
import { IBooking } from "src/app/models/IBooking";

export const selectBookings = createFeatureSelector<IBooking[]>('bookings');