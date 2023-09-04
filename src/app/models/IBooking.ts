import { ITable } from './ITable';

export interface IBooking {
  firstName: String;
  lastName: String;
  email: String;
  time: Number;
  persons: Number;
  table: ITable;
}
