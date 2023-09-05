import { createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";
import { ITablesState } from "./tables.reducer";

export const selectTables = (state: IAppState) => state.tables;

export const selectAllTables = createSelector(selectTables, (state: ITablesState) => state.tables)