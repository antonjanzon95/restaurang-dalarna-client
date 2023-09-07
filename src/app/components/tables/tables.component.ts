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

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables$ = this.store.select(selectAllTables);
  timeAndDate = new FormGroup({
    time: new FormControl(''),
    date: new FormControl(setTime(18)),
  });

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(TablesActions.getTables());
    console.log('Dispatched getTables');
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
    console.log('timeAndDate: ', this.timeAndDate.value);
    
    this.store.dispatch(
      BookingsActions.setTime({
        time: Number(this.timeAndDate.value.time),
        newDate: this.timeAndDate.value.date!
      })
    );
  }
}
