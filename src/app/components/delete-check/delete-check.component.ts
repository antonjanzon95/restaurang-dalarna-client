import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';

@Component({
  selector: 'app-delete-check',
  templateUrl: './delete-check.component.html',
  styleUrls: ['./delete-check.component.css'],
})
export class DeleteCheckComponent {
  constructor(
    private store: Store<IAppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteCheckComponent>
  ) {}

  deleteBooking() {
    this.store.dispatch(
      BookingsActions.deleteBooking({ bookingId: this.data.bookingId })
    );

    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
