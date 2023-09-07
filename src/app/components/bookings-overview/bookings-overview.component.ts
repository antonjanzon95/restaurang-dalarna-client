import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import {
  selectAllBookings,
  selectCurrentBooking,
} from 'src/app/store/bookings/bookings.selector';

@Component({
  selector: 'app-bookings-overview',
  templateUrl: './bookings-overview.component.html',
  styleUrls: ['./bookings-overview.component.css'],
})
export class BookingsOverviewComponent {
  bookings$ = this.store.select(selectAllBookings);
  currentBooking$ = this.store.select(selectCurrentBooking);

  constructor(private store: Store<IAppState>) {}

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  fetchBookingsByMonth(event: any) {
    const monthNumber = event.value;

    console.log(monthNumber);
    this.store.dispatch(BookingsActions.getBookingsByMonth({ monthNumber }));
  }

  fetchBookingsByDate(event: any) {
    const date = event.value;

    this.store.dispatch(BookingsActions.getBookingsByDate({ date }));
  }
}
