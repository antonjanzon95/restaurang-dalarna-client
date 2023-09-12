import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { UserActions } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.css'],
})
export class AuthButtonComponent {
  constructor(private store: Store<IAppState>) {}

  user$ = this.store.select(selectUser);

  logout() {
    this.store.dispatch(UserActions.logoutUser());
  }
}
