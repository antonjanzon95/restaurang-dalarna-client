import { NgModule, isDevMode } from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingsEffects } from './store/bookings/bookings.effects';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { NavComponent } from './components/nav/nav.component';
import { BookingsOverviewComponent } from './components/bookings-overview/bookings-overview.component';
import { BookingsTableComponent } from './components/bookings-table/bookings-table.component';
import { BookingInformationComponent } from './components/booking-information/booking-information.component';
import { DeleteCheckComponent } from './components/delete-check/delete-check.component';
import { environment } from 'src/environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { userEffects } from './store/user/user.effects';
import { userReducer } from './store/user/user.reducer';
import { BookingTimeInputComponent } from './components/booking-time-input/booking-time-input.component';

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
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
