import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BookingsOverviewComponent } from 'src/app/components/bookings-overview/bookings-overview.component';
import { BookingsStatisticsComponent } from 'src/app/components/bookings-statistics/bookings-statistics.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'bookings',
        component: BookingsOverviewComponent,
        data: { name: 'Bookings' },
      },
      {
        path: 'statistics',
        component: BookingsStatisticsComponent,
        data: { name: 'Statistics' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
