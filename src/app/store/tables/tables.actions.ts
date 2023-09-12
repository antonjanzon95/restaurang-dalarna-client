import { createAction, props } from '@ngrx/store';
import { IBooking } from 'src/app/models/IBooking';
import { ITable } from 'src/app/models/ITable';

export const TablesActions = {
  getTables: createAction('[Booking Modal] Get Tables'),
  getTablesFailure: createAction(
    '[Booking Modal] Get Tables Failure',
    props<{ error: string }>()
  ),
  getTablesSuccess: createAction(
    '[Booking Modal] Get Tables Success',
    props<{ tables: ITable[] }>()
  ),
  setLoading: createAction('[Effects] Set Status Loading'),
  setSuccess: createAction('[Effects] Set Status Success'),
};
