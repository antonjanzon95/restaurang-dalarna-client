import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';

@Component({
  selector: 'app-bookings-nav',
  templateUrl: './bookings-nav.component.html',
  styleUrls: ['./bookings-nav.component.css'],
})
export class BookingsNavComponent {
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
