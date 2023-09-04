import { IBooking } from './IBooking';

export interface ITable {
  _id: string;
  tableNumber: number;
  bookings: IBooking[];
}
