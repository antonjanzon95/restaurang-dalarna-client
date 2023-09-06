import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { safeString } from 'src/app/utilities/safeString';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { selectMakeBookingStatus } from 'src/app/store/bookings/bookings.selector';
import { Subject, take, takeUntil } from 'rxjs';
import { Status } from '../../models/Status';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<IAppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookingFormComponent>,
    private snackBar: MatSnackBar
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
        } else if (status === Status.Error) {
          this.openSnackBar('Booking failed.');
        }
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
    date: new FormControl(new Date().toString(), Validators.required),
    time: new FormControl('', Validators.required),
    persons: new FormControl(0, Validators.required),
  });

  onSubmit() {
    if (this.bookingDetails.invalid || !this.data.tableNumber) return;

    const firstName = safeString(this.bookingDetails.value.firstName);
    const lastName = safeString(this.bookingDetails.value.lastName);
    const email = safeString(this.bookingDetails.value.email);
    const date = safeString(this.bookingDetails.value.date).toString();
    const time = safeString(this.bookingDetails.value.time);
    const persons = Number(this.bookingDetails.value.persons);

    const bookingDetails: IBooking = {
      firstName,
      lastName,
      email,
      date,
      time,
      persons,
      tableNumber: this.data.tableNumber,
    };

    this.store.dispatch(BookingsActions.makeBooking({ bookingDetails }));
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

// TODO: Flytta ut kalender och tid till tables.
// Lägg till lyssning på detta så tables hämtas på nytt vid ändring.
// Lägg till isBooked på tables-interface
// Server: fixa check av bokade bord.
