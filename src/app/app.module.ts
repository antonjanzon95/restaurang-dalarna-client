import { NgModule } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    TableComponent,
    BookingsComponent,
    BookingFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { tables: tablesReducer, bookings: BookingsReducer },
      {}
    ),
    HttpClientModule,
    EffectsModule.forRoot([TablesEffect]),
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
