import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public afAuth: AngularFireAuth) {}

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
}
