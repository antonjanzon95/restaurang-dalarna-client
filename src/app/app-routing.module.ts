import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AdminComponent } from './views/admin/admin.component';
import { BookingSuccessComponent } from './views/booking-success/booking-success.component';
import { bookingSuccessGuard } from './booking-success.guard';
import { adminGuardGuard } from './guards/admin-guard.guard';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { name: 'Home' } },
  { path: 'login', component: AdminLoginComponent, data: { name: 'Login' } },
  {
    path: 'admin',
    canActivate: [adminGuardGuard],
    component: AdminComponent,
    data: { name: 'Admin' },
  },
  { path: 'booking-success', component: BookingSuccessComponent, data: { name: 'BookingSuccess' }, canActivate: [bookingSuccessGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
