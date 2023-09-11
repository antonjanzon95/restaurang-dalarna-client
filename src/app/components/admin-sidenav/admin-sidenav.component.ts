import { Component } from '@angular/core';
import { adminRoutes } from 'src/app/views/admin/admin-routing.module';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css'],
})
export class AdminSidenavComponent {
  routes = adminRoutes[0]!.children!.map((route) => ({
    path: `/admin/${route.path}`,
    name: route.data?.['name'],
  }));
}
