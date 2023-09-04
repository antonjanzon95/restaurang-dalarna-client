import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TablesComponent } from './components/tables/tables.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [AppComponent, TablesComponent, TableComponent],
  imports: [BrowserModule, AppRoutingModule, StoreModule.forRoot({}, {})],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
