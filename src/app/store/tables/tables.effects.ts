import { APP_BOOTSTRAP_LISTENER, Injectable, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TablesActions } from './tables.actions';
import { catchError, concatMap, map, of, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectSelectedTime } from '../bookings/bookings.selector';
import { IAppState } from '../app.state';
import { BookingsActions } from '../bookings/bookings.actions';

@Injectable()
export class TablesEffect {
  selectedTime = '';

  constructor(
    private bookingService: BookingService,
    private actions$: Actions,
    private store$: Store<IAppState>
  ) {
    this.store$
      .pipe(select((state) => state.bookings.selectedTime))
      .subscribe((time) => {
        this.selectedTime = time;
        console.log(time);
      });
  }

  getTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TablesActions.getTables),
      concatMap(() =>
        this.bookingService.getTables(this.selectedTime).pipe(
          map((tables) => ({
            tables,
            type: TablesActions.getTablesSuccess.type,
          })),
          catchError((err: HttpErrorResponse) =>
            of(TablesActions.getTablesFailure({ error: err.error.message }))
          )
        )
      )
    )
  );

  getTablesAfterSetTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.setTime),
      concatMap(() =>
        this.bookingService.getTables(this.selectedTime).pipe(
          map((tables) => ({
            tables,
            type: TablesActions.getTablesSuccess.type,
          })),
          catchError((err: HttpErrorResponse) =>
            of(TablesActions.getTablesFailure({ error: err.error.message }))
          )
        )
      )
    )
  );
}
