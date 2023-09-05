import { IBookingsState } from "./bookings/bookings.reducer";
import { ITablesState } from "./tables/tables.reducer";

export interface IAppState {
  tables: ITablesState
  bookings: IBookingsState
}

