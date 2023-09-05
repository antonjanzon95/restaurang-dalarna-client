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


@NgModule({
  declarations: [AppComponent, TablesComponent, TableComponent, BookingsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({tables: tablesReducer, bookings: BookingsReducer}, {}),
    HttpClientModule,
    EffectsModule.forRoot([TablesEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
