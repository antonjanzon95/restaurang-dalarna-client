import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBooking } from 'src/app/models/IBooking';
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
    return this.http.get<IBooking[]>('http://localhost:3000/bookings')
  }
}
