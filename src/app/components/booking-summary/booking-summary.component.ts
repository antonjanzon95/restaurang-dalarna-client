import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css'],
})
export class BookingSummaryComponent implements OnInit {
  latestBooking: IBooking | undefined;
  formattedTime: string | undefined | null;
  constructor(private store: Store<IAppState>, private datePipe: DatePipe, private router: Router) {}
  ngOnInit(): void {
    this.store
      .select((state) => state.bookings.latestBooking)
      .subscribe((latestBooking) => {
        this.latestBooking = latestBooking;
        this.formattedTime = this.datePipe.transform(latestBooking?.time, "EEEE d MMMM 'kl' HH:mm");
        if (!latestBooking) this.router.navigateByUrl('/')
      });
  }

  log() {
    console.log(this.latestBooking);
  }
}
