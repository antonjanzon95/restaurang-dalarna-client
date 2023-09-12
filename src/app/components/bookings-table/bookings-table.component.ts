import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { selectCurrentBooking } from 'src/app/store/bookings/bookings.selector';

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css'],
})
export class BookingsTableComponent {
  @Input() bookings: IBooking[] | undefined;
  @Input() isAdmin: boolean | undefined;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'time',
    'persons',
    'tableNumber',
  ];
  loading$ = this.store.select((state) => state.bookings.getBookingsStatus);

  constructor(private store: Store<IAppState>) {}

  setCurrentBooking(bookingId: string) {
    this.store.dispatch(BookingsActions.setCurrentBooking({ bookingId }));
  }
}
