import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { TablesActions } from 'src/app/store/tables/tables.actions';
import { selectAllTables } from 'src/app/store/tables/tables.selector';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { FormControl, FormGroup } from '@angular/forms';
import { setTime } from 'src/app/utilities/setTime';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { selectSelectedTime } from 'src/app/store/bookings/bookings.selector';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables$ = this.store.select(selectAllTables);
  // selectedTime: string | Date = new Date(setTime(18));
  timeAndDate = new FormGroup({
    time: new FormControl(''),
    date: new FormControl(''),
  });
  @ViewChild('dateInput') dateInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store
      .pipe(select((state) => state.bookings.selectedTime))
      .subscribe((selectedTime) => {
        // this.selectedTime = selectedTime
        this.timeAndDate.setValue({
          time: new Date(selectedTime).getHours().toString(),
          date: '9/8/2023',
        });
        this.store.dispatch(
          TablesActions.getTables({
            time: selectedTime,
          })
        );
        console.log('Dispatched getTables');
      });
  }

  openDialog(tableNumber: number) {
    const dialogRef = this.dialog.open(BookingFormComponent, {
      data: { tableNumber: tableNumber },
    });

    dialogRef.afterClosed().subscribe(() => console.log('Hej'));
  }

  logForm() {
    console.log(this.timeAndDate.value);
  }

  handleInputChangeEvent() {
    this.store.dispatch(
      BookingsActions.setTime({
        time: Number(this.timeAndDate.value.time),
        newDate: this.timeAndDate.value.date as string,
      })
    );
    this.store.dispatch(
      TablesActions.getTables({
        time: setTime(
          Number(this.timeAndDate.value.time),
          this.timeAndDate.value.date as string
        ),
      })
    );
  }
}
