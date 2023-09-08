import { Component } from '@angular/core';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  public navRoutes = routes.filter((route) => route.path !== 'booking-success');
}
