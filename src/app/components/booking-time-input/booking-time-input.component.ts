import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { setTime } from 'src/app/utilities/setTime';

@Component({
  selector: 'app-booking-time-input',
  templateUrl: './booking-time-input.component.html',
  styleUrls: ['./booking-time-input.component.css'],
})
export class BookingTimeInputComponent {
  constructor(private store: Store<IAppState>) {}
  time = new FormControl(18)
  date = new FormControl<Date>(new Date())

  handleInputChangeEvent() {
    this.store.dispatch(
      BookingsActions.setTime({
        time: Number(this.time.value),
        newDate: this.date.value,
      })
    );
  }
}
