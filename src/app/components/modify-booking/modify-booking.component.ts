import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { IBooking } from 'src/app/models/IBooking';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-modify-booking',
  templateUrl: './modify-booking.component.html',
  styleUrls: ['./modify-booking.component.css'],
})
export class ModifyBookingComponent implements OnInit {
  currentBooking: IBooking | null = null;
  modifyBookingDetails: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    persons: ['', Validators.required],
    time: ['', Validators.required]
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: { bookingId: string } },
    private store: Store<IAppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.store
      .select((state) => state.bookings.currentBooking)
      .subscribe((bookingData) => {
        this.currentBooking = bookingData;
        console.log(this.currentBooking);
        if (this.currentBooking) {
          this.modifyBookingDetails.patchValue({
            firstName: this.currentBooking.firstName,
            lastName: this.currentBooking.lastName,
            email: this.currentBooking.email,
            persons: this.currentBooking.persons,
            time: this.currentBooking.time
          });
        }
      });
  }
}
