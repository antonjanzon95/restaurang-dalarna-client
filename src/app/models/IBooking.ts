import { ITable } from './ITable';

export interface IBooking {
  firstName: string;
  lastName: string;
  email: string;
  time: number;
  persons: number;
  table: ITable;
}
