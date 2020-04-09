import { ActionReducerMap } from '@ngrx/store';
import * as fromCalendar from './calendar.reducer';

export interface AppState {
    calendar: fromCalendar.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    calendar: fromCalendar.calendarReducer
};
