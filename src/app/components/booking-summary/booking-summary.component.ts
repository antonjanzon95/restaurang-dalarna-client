import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css'],
})
export class BookingSummaryComponent {
  latestBooking = this.store.select((state) => state.bookings.latestBooking)
  formattedTime: string | undefined | null;
  constructor(private store: Store<IAppState>) {}
}
