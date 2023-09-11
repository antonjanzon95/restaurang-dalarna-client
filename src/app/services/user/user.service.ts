import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserInfo } from 'src/app/models/IUserInfo';
import { IAppState } from 'src/app/store/app.state';
import { isAdmin, selectUser } from 'src/app/store/user/user.selector';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private store: Store<IAppState>) {}

  signUpUser(
    email: string,
    password: string,
    repeatPassword: string,
    isAdmin: boolean
  ) {
    if (!isAdmin)
      // User
      return this.http.post<IUserInfo>('http://localhost:3000/users/create', {
        email,
        password,
        repeatPassword,
      });

    // Admin
    return this.http.post<IUserInfo>('http://localhost:3000/admin/create', {
      email,
      password,
      repeatPassword,
    });
  }

  loginUser(email: string, password: string) {
    return this.http.post<IUserInfo>('http://localhost:3000/users/login', {
      email,
      password,
    });
  }

  isAdmin() {
    return this.store.select(isAdmin);
  }

  // signUpUser(email: string, password: string): Observable<any> {
  //   return from(
  //     this.afAuth
  //       .createUserWithEmailAndPassword(email, password)
  //       .then((res) => res.user)
  //   );
  // }

  // loginUser(email: string, password: string): Observable<any> {
  //   return from(
  //     this.afAuth
  //       .signInWithEmailAndPassword(email, password)
  //       .then((res) => res.user)
  //   );
  // }

  // signOut(): Observable<any> {
  //   return from(this.afAuth.signOut().then(() => alert('logged out')));
  // }
}
