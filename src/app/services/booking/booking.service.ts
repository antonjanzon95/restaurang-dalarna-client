import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBooking, IBookingResponse } from 'src/app/models/IBooking';
import { ITable } from 'src/app/models/ITable';
import { IAppState } from 'src/app/store/app.state';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient, private store: Store<IAppState>) {}

  getTables(time: string) {
    return this.http.post<ITable[]>(
      'https://restaurang-dalarna-server-production.up.railway.app/tables',
      { time }
    );
  }

  getBookings() {
    return this.http.get<IBookingResponse[]>(
      'https://restaurang-dalarna-server-production.up.railway.app/bookings'
    );
  }

  getBookingsByUserId(userId: string) {
    return this.http.get<IBookingResponse[]>(
      `https://restaurang-dalarna-server-production.up.railway.app/bookings/${userId}`
    );
  }

  getBookingsByDate(date: string) {
    return this.http.post<IBookingResponse[]>(
      'https://restaurang-dalarna-server-production.up.railway.app/bookings/day',
      {
        date,
      }
    );
  }

  getBookingsByMonth(monthNumber: number) {
    console.log(monthNumber);
    return this.http.post<IBookingResponse[]>(
      'https://restaurang-dalarna-server-production.up.railway.app/bookings/month',
      {
        monthNumber,
      }
    );
  }

  newBooking(bookingDetails: IBooking) {
    return this.http.post<IBookingResponse>(
      'https://restaurang-dalarna-server-production.up.railway.app/bookings/new',
      {
        bookingDetails,
      }
    );
  }

  deleteBooking(bookingId: string) {
    return this.http.delete<{ deletedId: string }>(
      `https://restaurang-dalarna-server-production.up.railway.app/bookings/delete/${bookingId}`
    );
  }

  updateBooking(bookingDetails: IBookingResponse) {
    return this.http.put<{
      message: string;
      success: boolean;
      body: IBookingResponse;
    }>(
      'https://restaurang-dalarna-server-production.up.railway.app/bookings/update',
      bookingDetails
    );
  }

  bookingSuccessGuard() {
    return this.store.select((state) => state.bookings.latestBooking);
  }
}
