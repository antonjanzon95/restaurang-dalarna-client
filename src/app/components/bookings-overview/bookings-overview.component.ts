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
}
