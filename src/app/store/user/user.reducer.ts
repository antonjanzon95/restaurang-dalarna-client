import { createReducer, on } from '@ngrx/store';
import { User } from 'firebase/auth';
import { UserActions } from './user.actions';
import { Status } from 'src/app/models/Status';

export interface IUserState {
  user: User | null;
  error: string | null;
  status: Status;
}

export const initialState: IUserState = {
  user: null,
  error: null,
  status: Status.Idle,
};

export const userReducer = createReducer(
  initialState,
  // Sign Up
  on(UserActions.signUpUser, (state) => ({
    ...state,
    status: Status.Pending,
  })),
  on(UserActions.signUpUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: Status.Error,
  })),
  on(UserActions.signUpUserSuccess, (state, { user }) => ({
    ...state,
    error: null,
    user: user,
    status: Status.Success,
  })),

  // Login
  on(UserActions.loginUser, (state) => ({
    ...state,
    status: Status.Pending,
  })),
  on(UserActions.loginUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: Status.Error,
  })),
  on(UserActions.loginUserSuccess, (state, { user }) => ({
    ...state,
    error: null,
    user: user,
    status: Status.Success,
  })),

  // Logout
  on(UserActions.logoutUser, (state) => ({
    ...state,
    status: Status.Pending,
  })),
  on(UserActions.logoutUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: Status.Error,
  })),
  on(UserActions.logoutUserSuccess, (state) => ({
    ...state,
    error: null,
    user: null,
    status: Status.Success,
  }))
);
