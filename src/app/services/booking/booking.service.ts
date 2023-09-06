import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking } from 'src/app/models/IBooking';
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
    return this.http.get<IBooking[]>('http://localhost:3000/bookings');
  }

  newBooking(bookingDetails: IBooking) {
    return this.http.post<IBooking>('http://localhost:3000/bookings/new', {
      bookingDetails,
    });
  }
}
