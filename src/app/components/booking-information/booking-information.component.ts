import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IBookingResponse } from 'src/app/models/IBooking';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { DeleteCheckComponent } from '../delete-check/delete-check.component';

@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.css'],
})
export class BookingInformationComponent implements OnInit {
  @Input() currentBooking: IBookingResponse | undefined;
  date: Date | undefined;

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.currentBooking) this.date = new Date(this.currentBooking.date);
  }

  resetCurrentBooking() {
    this.store.dispatch(BookingsActions.resetCurrentBooking());
  }

  openDialog() {
    this.dialog.open(DeleteCheckComponent, {
      data: { bookingId: this.currentBooking?._id },
    });
  }
}
