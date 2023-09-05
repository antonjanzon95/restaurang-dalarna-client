import { Injectable } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TablesActions } from './tables.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TablesEffect {
  constructor(
    private bookingService: BookingService,
    private actions$: Actions
  ) {}

  getTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TablesActions.getTables),
      concatMap(() =>
        this.bookingService.getTables().pipe(
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
