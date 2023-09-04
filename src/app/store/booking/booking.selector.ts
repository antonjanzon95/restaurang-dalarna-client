import { createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";
import { IBookingState } from "./booking.reducer";

export const selectTables = (state: IAppState) => state.tables;

export const selectAllTables = createSelector(selectTables, (state: IBookingState) => state.tables)