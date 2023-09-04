import { Injectable } from '@angular/core';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookingActions } from './booking.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookingEffect {
  constructor(
    private bookingService: BookingService,
    private actions$: Actions
  ) {}

  getBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingActions.getBookings),
      concatMap(() =>
        this.bookingService.getTables().pipe(
          map((tables) => ({
            tables,
            type: BookingActions.getBookingsSuccess.type,
          })),
          catchError((err: HttpErrorResponse) =>
            of(BookingActions.getBookingsFailure({ error: err.error.message }))
          )
        )
      )
    )
  );
}
