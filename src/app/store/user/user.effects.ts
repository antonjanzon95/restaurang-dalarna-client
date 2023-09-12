import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user/user.service';
import { UserActions } from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class userEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      switchMap(({ email, password }) =>
        this.userService.loginUser(email, password).pipe(
          map((response) => {
            this.router.navigateByUrl('');
            return UserActions.loginUserSuccess({ user: response });
          }),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.loginUserFailure({ error: error.error.message }))
          )
        )
      )
    )
  );

  signUpUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.signUpUser),
      switchMap(({ email, password, repeatPassword, isAdmin }) =>
        this.userService
          .signUpUser(email, password, repeatPassword, isAdmin)
          .pipe(
            map((response) =>
              UserActions.signUpUserSuccess({ user: response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(UserActions.signUpUserFailure({ error: error.error.message }))
            )
          )
      )
    )
  );

  // loginUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.loginUser),
  //     switchMap(({ email, password }) =>
  //       this.userService.loginUser(email, password).pipe(
  //         map(parseUser),
  //         map((response: IUserInfo | null) => {
  //           if (response)
  //             return UserActions.loginUserSuccess({ user: response });
  //           throw new Error('No user returned.');
  //         }),
  //         catchError((error: HttpErrorResponse) =>
  //           of(UserActions.loginUserFailure({ error: error.error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  // signUpUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.signUpUser),
  //     switchMap(({ email, password }) =>
  //       this.userService.signUpUser(email, password).pipe(map(parseUser))
  //     ),
  //     map((user) => UserActions.signUpUserSuccess({ user }))
  //   )
  // );

  // logoutUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.logoutUser),
  //     switchMap(() =>
  //       this.userService.signOut().pipe(
  //         map(() => {
  //           console.log('effect before success');
  //           return UserActions.logoutUserSuccess();
  //         }),
  //         catchError((error: HttpErrorResponse) => {
  //           console.log('effect before failure');
  //           return of(
  //             UserActions.logoutUserFailure({ error: error.error.message })
  //           );
  //         })
  //       )
  //     )
  //   )
  // );
}
