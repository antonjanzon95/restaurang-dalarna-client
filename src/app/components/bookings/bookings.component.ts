import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import {
  selectAllBookings,
  selectSelectedTime,
} from 'src/app/store/bookings/bookings.selector';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  bookings$ = this.store.select(selectAllBookings);
  selectedTime$ = this.store.pipe(select(selectSelectedTime));
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.selectedTime$.subscribe(() => {
      this.store.dispatch(BookingsActions.getBookings());
      console.log('Fetched bookings');
    });
  }
}
