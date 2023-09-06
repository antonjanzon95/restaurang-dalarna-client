import { ITable } from './ITable';

export interface IBooking {
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  time: string;
  persons: number;
  tableNumber: number;
}
