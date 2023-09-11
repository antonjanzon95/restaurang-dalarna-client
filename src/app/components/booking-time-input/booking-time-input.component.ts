import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';

@Component({
  selector: 'app-booking-time-input',
  templateUrl: './booking-time-input.component.html',
  styleUrls: ['./booking-time-input.component.css'],
  // providers: [{ provide: MAT_DATE_LOCALE, useValue: 'sv-SE' }],
})
export class BookingTimeInputComponent {
  constructor(
    private store: Store<IAppState>,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('sv-SE');
  }
  time = new FormControl(18);
  date = new FormControl(new Date()); // Vid ändring sätts ett Date-objekt

  handleInputChangeEvent() {
    this.store.dispatch(
      BookingsActions.setTime({
        time: Number(this.time.value),
        newDate: this.date.value,
      })
    );
  }
}
