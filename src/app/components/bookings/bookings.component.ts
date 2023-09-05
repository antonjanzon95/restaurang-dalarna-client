import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { selectAllBookings, selectBookings } from 'src/app/store/bookings/bookings.selector';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings$ = this.store.select(selectAllBookings);
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(BookingsActions.getBookings());
  }
}
