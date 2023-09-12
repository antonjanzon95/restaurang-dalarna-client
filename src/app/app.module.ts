import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TablesComponent } from './components/tables/tables.component';
import { TableComponent } from './components/table/table.component';
import { tablesReducer } from './store/tables/tables.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TablesEffect } from './store/tables/tables.effects';
import { BookingsComponent } from './components/bookings/bookings.component';
import { BookingsReducer } from './store/bookings/bookings.reducer';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingsEffects } from './store/bookings/bookings.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { NavComponent } from './components/nav/nav.component';
import { BookingsOverviewComponent } from './components/bookings-overview/bookings-overview.component';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { BookingInformationComponent } from './components/booking-information/booking-information.component';
import { DeleteCheckComponent } from './components/delete-check/delete-check.component';
// import { environment } from 'src/environments/environment.development';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { userEffects } from './store/user/user.effects';
import { userReducer } from './store/user/user.reducer';
import { BookingTimeInputComponent } from './components/booking-time-input/booking-time-input.component';
import { BookingsNavComponent } from './components/bookings-nav/bookings-nav.component';
import { BookingsStatisticsComponent } from './components/bookings-statistics/bookings-statistics.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingSuccessComponent } from './views/booking-success/booking-success.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ModifyBookingComponent } from './components/modify-booking/modify-booking.component';
import { MenuComponent } from './components/menu/menu.component';

registerLocaleData(localeSv);

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    TableComponent,
    BookingsComponent,
    BookingFormComponent,
    HomeComponent,
    AdminComponent,
    NavComponent,
    BookingsOverviewComponent,
    BookingsTableComponent,
    BookingInformationComponent,
    DeleteCheckComponent,
    AdminLoginComponent,
    BookingTimeInputComponent,
    BookingsNavComponent,
    BookingsStatisticsComponent,
    AdminSidenavComponent,
    BookingSuccessComponent,
    BookingSummaryComponent,
    AuthButtonComponent,
    MyBookingsComponent,
    ModifyBookingComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { tables: tablesReducer, bookings: BookingsReducer, user: userReducer },
      {}
    ),
    HttpClientModule,
    EffectsModule.forRoot([TablesEffect, BookingsEffects, userEffects]),
    ReactiveFormsModule,
    FormsModule,
    SharedMaterialModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'sv-SE' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
