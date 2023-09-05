import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingService } from "src/app/services/booking/booking.service";
import { BookingsActions } from "./bookings.actions";

@Injectable()
export class BookingsEffects {
  constructor(private bookingService: BookingService, private actions$: Actions){}

  getBookings$ = createEffect(() => {
    this.actions$.pipe(ofType(BookingsActions.getBookings))    
  })
}