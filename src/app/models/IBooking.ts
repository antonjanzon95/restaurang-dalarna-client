export interface IBooking {
  firstName: string;
  lastName: string;
  email: string;
  // date: string;
  time: string;
  persons: number;
  tableNumber: number;
  userId?: string;
}

export interface IBookingResponse extends IBooking {
  _id: string;
}
