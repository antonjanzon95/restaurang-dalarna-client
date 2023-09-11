import { createAction, props } from '@ngrx/store';
import { IUserInfo } from 'src/app/models/IUserInfo';

export const UserActions = {
  // Sign up
  signUpUser: createAction(
    '[Sign Up Page] Sign Up User',
    props<{
      email: string;
      password: string;
      repeatPassword: string;
      isAdmin: boolean;
    }>()
  ),
  signUpUserFailure: createAction(
    '[Sign Up Page] Sign Up User Failure',
    props<{ error: string }>()
  ),
  signUpUserSuccess: createAction(
    '[Sign Up Page] Sign Up User Success',
    props<{ user: IUserInfo }>()
  ),

  // Login
  loginUser: createAction(
    '[Login Page] Login User',
    props<{ email: string; password: string }>()
  ),
  loginUserFailure: createAction(
    '[Login Page] Login User Failure',
    props<{ error: string }>()
  ),
  loginUserSuccess: createAction(
    '[Login Page] Login User Success',
    props<{ user: IUserInfo }>()
  ),

  // Logout
  logoutUser: createAction('[Logout Button] Logout User'),
  logoutUserFailure: createAction(
    '[Logout Button] Logout User Failure',
    props<{ error: string }>()
  ),
  logoutUserSuccess: createAction('[Logout Button] Logout User Success'),
};
