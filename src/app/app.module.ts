import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TablesComponent } from './components/tables/tables.component';
import { TableComponent } from './components/table/table.component';
import { bookingReducer } from './store/booking/booking.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookingEffect } from './store/booking/booking.effects';


@NgModule({
  declarations: [AppComponent, TablesComponent, TableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({bookings: bookingReducer}, {}),
    HttpClientModule,
    EffectsModule.forRoot([BookingEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
