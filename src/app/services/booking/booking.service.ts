import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking, IBookingResponse } from 'src/app/models/IBooking';
import { ITable } from 'src/app/models/ITable';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getTables() {
    return this.http.get<ITable[]>('http://localhost:3000/tables');
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
}
