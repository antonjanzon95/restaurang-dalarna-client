import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { IBooking, IBookingResponse } from 'src/app/models/IBooking';
import { Status } from 'src/app/models/Status';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { selectMakeBookingStatus } from 'src/app/store/bookings/bookings.selector';
import { formatDate } from 'src/app/utilities/formatDate';

@Component({
  selector: 'app-modify-booking',
  templateUrl: './modify-booking.component.html',
  styleUrls: ['./modify-booking.component.css'],
})
export class ModifyBookingComponent implements OnInit {
  private destroy$ = new Subject<void>();
  currentBooking: IBookingResponse | null = null;
  modifyBookingDetails: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    persons: ['', Validators.required],
    time: ['', Validators.required],
    date: ['', Validators.required],
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { data: { bookingId: string } },
    private store: Store<IAppState>,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModifyBookingComponent>,
    private snackBar: MatSnackBar
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
            time: new Date(this.currentBooking.time).getHours().toString(),
            date: new Date(this.currentBooking.time),
          });
        }
      });
    this.store
      .select(selectMakeBookingStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        if (status === Status.Success) {
          this.openSnackBar('Booking successfully updated.');
          this.dialogRef.close();
          this.store.dispatch(BookingsActions.resetMakeBookingStatus());
        } else if (status === Status.Error) {
          this.openSnackBar('Booking update failed.');
        }
      });
  }

  onSubmit() {
    if (this.modifyBookingDetails.invalid) return;
    const bookingDetails: IBookingResponse = {
      ...this.modifyBookingDetails.value,
      _id: this.currentBooking?._id,
      time: formatDate(
        this.modifyBookingDetails.value.time,
        this.modifyBookingDetails.value.date
      ),
    };
    console.log(bookingDetails);
    this.store.dispatch(BookingsActions.updateBooking({ bookingDetails }));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }
}
