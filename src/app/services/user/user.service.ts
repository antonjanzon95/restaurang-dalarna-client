import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { IAppState } from 'src/app/store/app.state';
import { selectUser } from 'src/app/store/user/user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    public afAuth: AngularFireAuth,
    private store: Store<IAppState>
  ) {}

  signUpUser(email: string, password: string): Observable<any> {
    return from(
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => res.user)
    );
  }

  loginUser(email: string, password: string): Observable<any> {
    return from(
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => res.user)
    );
  }

  signOut() {
    this.afAuth.signOut();
  }

  isLoggedIn() {
    return this.store.select(selectUser);
  }
}
