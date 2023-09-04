import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ITable } from 'src/app/models/ITable';
import { BookingService } from 'src/app/services/booking/booking.service';
import { IAppState } from 'src/app/store/app.state';
import { BookingActions } from 'src/app/store/booking/booking.actions';
import { selectAllTables } from 'src/app/store/booking/booking.selector';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  tables$ = this.store.select(selectAllTables)
  constructor(private store: Store<IAppState>) {}
  ngOnInit(): void {
    this.store.dispatch(BookingActions.getBookings())
  }
}
