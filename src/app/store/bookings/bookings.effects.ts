import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookingService } from 'src/app/services/booking/booking.service';
import { BookingsActions } from './bookings.actions';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IBooking } from 'src/app/models/IBooking';
import { IAppState } from '../app.state';
import { Store } from '@ngrx/store';
import { TablesActions } from '../tables/tables.actions';

@Injectable()
export class BookingsEffects {
  constructor(
    private bookingService: BookingService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}

  getBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.getBookings),
      concatMap(() =>
        this.bookingService.getBookings().pipe(
          map((bookings) => BookingsActions.getBookingsSuccess({ bookings })),
          catchError((err: HttpErrorResponse) =>
            of(BookingsActions.getBookingsFailure({ err: err.error.message }))
          )
        )
      )
    )
  );

  getBookingsByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.getBookingsByDate),
      switchMap(({ date }) =>
        this.bookingService.getBookingsByDate(date).pipe(
          map((bookings) =>
            BookingsActions.getBookingsByDateSuccess({ bookings })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              BookingsActions.getBookingsByDateFailure({
                error: error.error.message,
              })
            )
          )
        )
      )
    )
  );

  // getBookingsByMonth$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BookingsActions.getBookingsByMonth),
  //     switchMap(({ monthNumber }) =>
  //       this.bookingService.getBookingsByMonth(monthNumber).pipe(
  //         map((bookings) =>
  //           BookingsActions.getBookingsByMonthSuccess({ bookings })
  //         ),
  //         catchError((error: HttpErrorResponse) =>
  //           of(
  //             BookingsActions.getBookingsByMonthFailure({
  //               error: error.error.message,
  //             })
  //           )
  //         )
  //       )
  //     )
  //   )
  // );
  getBookingsByMonth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.getBookingsByMonth),
      switchMap((monthNumber) => {
        console.log(monthNumber);
        return this.bookingService
          .getBookingsByMonth(monthNumber.monthNumber)
          .pipe(
            map((bookings) =>
              BookingsActions.getBookingsByMonthSuccess({ bookings })
            ),
            catchError((error: HttpErrorResponse) =>
              of(
                BookingsActions.getBookingsByMonthFailure({
                  error: error.error.message,
                })
              )
            )
          );
      })
    )
  );

  newBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.makeBooking),
      concatMap(({ bookingDetails }) =>
        this.bookingService.newBooking(bookingDetails).pipe(
          map((response) => {
            this.store.dispatch(TablesActions.getTables());
            this.store.dispatch(
              BookingsActions.setLatestBooking({ bookingDetails })
            );
            return BookingsActions.makeBookingSuccess({ booking: response });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              BookingsActions.makeBookingFailure({
                error: error.error.message,
              })
            )
          )
        )
      )
    )
  );

  deleteBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.deleteBooking),
      concatMap(({ bookingId }) =>
        this.bookingService.deleteBooking(bookingId).pipe(
          map(({ deletedId }) =>
            BookingsActions.deleteBookingSuccess({ deletedId })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              BookingsActions.deleteBookingFailure({
                error: error.error.message,
              })
            )
          )
        )
      )
    )
  );

  updateBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookingsActions.updateBooking),
      concatMap(({ bookingDetails }) =>
        this.bookingService.updateBooking(bookingDetails).pipe(
          map((response) => {
            this.store.dispatch(
              BookingsActions.setCurrentBookingWithDetails({
                bookingDetails: response.body,
              })
            );
            this.store.dispatch(BookingsActions.getBookingsByMonth({monthNumber: new Date(bookingDetails.time).getMonth()}));
            this.store.dispatch(TablesActions.getTables());
            return BookingsActions.updateBookingSuccess({
              bookingDetails: response.body,
            });
          }),
          catchError((error: HttpErrorResponse) =>
            of(
              BookingsActions.updateBookingFailure({
                error: error.error.message,
              })
            )
          )
        )
      )
    )
  );
}
