import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { TablesActions } from 'src/app/store/tables/tables.actions';
import { selectAllTables } from 'src/app/store/tables/tables.selector';
import { BookingFormComponent } from '../booking-form/booking-form.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables$ = this.store.select(selectAllTables);

  constructor(private store: Store<IAppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(TablesActions.getTables());
  }

  openDialog(tableNumber: number) {
    const dialogRef = this.dialog.open(BookingFormComponent, {
      data: { tableNumber: tableNumber },
    });

    dialogRef.afterClosed().subscribe(() => console.log('Hej'));
  }
}
