import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { safeString } from 'src/app/utilities/safeString';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  selectMakeBookingStatus,
  selectSelectedTime,
} from 'src/app/store/bookings/bookings.selector';
import { Subject, takeUntil } from 'rxjs';
import { Status } from '../../models/Status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, OnDestroy {
  selectedTime = '';
  userId: string | undefined;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<IAppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookingFormComponent>,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectMakeBookingStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        if (status === Status.Success) {
          this.openSnackBar('Booking successfully made.');
          this.dialogRef.close();
          this.store.dispatch(BookingsActions.resetMakeBookingStatus());
          this.router.navigateByUrl('booking-success');
        } else if (status === Status.Error) {
          this.openSnackBar('Booking failed.');
        }
      });
    this.store
      .select(selectSelectedTime)
      .pipe()
      .subscribe((selectedTime) => (this.selectedTime = selectedTime));

    this.store.select(selectUser).subscribe((user) => {
      console.log(user);
      console.log(user!._id);
      if (user) this.userId = user._id;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  bookingDetails = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    persons: new FormControl(0, Validators.required),
  });

  onSubmit() {
    if (this.bookingDetails.invalid || !this.data.tableNumber) return;

    const firstName = safeString(this.bookingDetails.value.firstName);
    const lastName = safeString(this.bookingDetails.value.lastName);
    const email = safeString(this.bookingDetails.value.email);
    const persons = Number(this.bookingDetails.value.persons);

    if (!this.userId) return alert('You must be logged in to make a booking!');

    const bookingDetails: IBooking = {
      firstName,
      lastName,
      email,
      time: this.selectedTime,
      persons,
      tableNumber: this.data.tableNumber,
      userId: this.userId,
    };
    this.store.dispatch(BookingsActions.makeBooking({ bookingDetails }));
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
