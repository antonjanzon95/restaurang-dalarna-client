import { Component, OnDestroy, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { IAppState } from 'src/app/store/app.state';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  user$ = this.store.select(selectUser);
  destroy$: Subscription | undefined;

  navRoutes: Routes = routes.filter(
    (route) => route.path !== 'booking-success' && route.path !== 'login'
  );

  ngOnInit(): void {
    this.destroy$ = this.user$.subscribe((user) => {
      if (user && user?.isAdmin) {
        this.navRoutes = routes.filter(
          (route) => route.path !== 'booking-success' && route.path !== 'login'
        );
      } else if (user && !user.isAdmin) {
        this.navRoutes = routes.filter(
          (route) =>
            route.path !== 'booking-success' &&
            route.path !== 'login' &&
            route.path !== 'admin'
        );
      } else {
        this.navRoutes = routes.filter(
          (route) => route.path === '' || route.path === 'menu'
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$?.unsubscribe();
  }
}
