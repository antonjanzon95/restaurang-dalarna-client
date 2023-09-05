import { IBooking } from '../../models/IBooking';
import { createReducer, on } from '@ngrx/store';
import { TablesActions } from './tables.actions';
import { state } from '@angular/animations';
import { ITable } from 'src/app/models/ITable';
import { Status } from 'src/app/models/Status';

export interface ITablesState {
  tables: ITable[] | null;
  error: string | null;
  status: Status
}



export const initialState: ITablesState = {
  tables: null,
  error: null,
  status: Status.Idle,
};

export const tablesReducer = createReducer(
  initialState,
  on(TablesActions.getTables, (state) => ({
    ...state,
    status: Status.Pending
  })),
  on(TablesActions.getTablesFailure, (state, { error }) => ({
    ...state,
    error,
    status: Status.Error
  })),
  on(TablesActions.getTablesSuccess, (state, { tables }) => ({
    ...state,
    error: null,
    tables: tables,
    status: Status.Success
  }))
);
