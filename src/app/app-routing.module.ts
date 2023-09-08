import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { BookingSuccessComponent } from './views/booking-success/booking-success.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { name: 'Home' } },
  { path: 'admin', component: AdminComponent, data: { name: 'Admin' } },
  { path: 'booking-success', component: BookingSuccessComponent, data: { name: 'BookingSuccess' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
