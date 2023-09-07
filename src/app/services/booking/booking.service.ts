import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking, IBookingResponse } from 'src/app/models/IBooking';
import { ITable } from 'src/app/models/ITable';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getTables(time: string) {
    return this.http.post<ITable[]>('http://localhost:3000/tables', { time });
  }

  getBookings() {
    return this.http.get<IBookingResponse[]>('http://localhost:3000/bookings');
  }

  getBookingsByDate(date: Date) {
    return this.http.post<IBookingResponse[]>(
      'http://localhost:3000/bookings/day',
      {
        date,
      }
    );
  }

  getBookingsByMonth(monthNumber: number) {
    console.log(monthNumber);
    return this.http.post<IBookingResponse[]>(
      'http://localhost:3000/bookings/month',
      {
        monthNumber,
      }
    );
  }

  newBooking(bookingDetails: IBooking) {
    return this.http.post<IBookingResponse>(
      'http://localhost:3000/bookings/new',
      {
        bookingDetails,
      }
    );
  }

  deleteBooking(bookingId: string) {
    return this.http.delete(
      `http://localhost:3000/bookings/delete/${bookingId}`
    );
  }
}
