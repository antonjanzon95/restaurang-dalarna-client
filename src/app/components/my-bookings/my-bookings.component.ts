import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, switchMap } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';
import { BookingsActions } from 'src/app/store/bookings/bookings.actions';
import { selectUserBookings } from 'src/app/store/bookings/bookings.selector';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit, OnDestroy {
  constructor(public store: Store<IAppState>) {}

  user$ = this.store.select(selectUser);
  userBookings$ = this.store.select(selectUserBookings);
  destroy$: Subscription | undefined;

  ngOnInit(): void {
    this.destroy$ = this.user$.subscribe((user) => {
      if (user)
        this.store.dispatch(
          BookingsActions.getBookingsByUserId({ userId: user._id })
        );
    });
  }

  ngOnDestroy(): void {
    this.destroy$?.unsubscribe();
  }
}
