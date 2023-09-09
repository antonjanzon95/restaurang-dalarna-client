import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/services/user/user.service';
import { UserActions } from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'firebase/auth';

@Injectable()
export class userEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      switchMap(({ email, password }) =>
        this.userService.loginUser(email, password).pipe(
          map((response: User | null) => {
            if (response)
              return UserActions.loginUserSuccess({ user: response });
            throw new Error('No user returned.');
          }),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.loginUserFailure({ error: error.error.message }))
          )
        )
      )
    )
  );
}
