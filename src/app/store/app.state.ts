import { IBookingsState } from './bookings/bookings.reducer';
import { ITablesState } from './tables/tables.reducer';
import { IUserState } from './user/user.reducer';

export interface IAppState {
  tables: ITablesState;
  bookings: IBookingsState;
  user: IUserState;
}
