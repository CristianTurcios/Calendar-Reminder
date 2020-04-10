import { ActionReducerMap } from '@ngrx/store';
import * as fromCalendar from './calendar.reducer';
import * as fromReminder from './reminder.reducer';

export interface AppState {
    calendar: fromCalendar.State;
    reminder: fromReminder.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    calendar: fromCalendar.calendarReducer,
    reminder: fromReminder.reminderReducer
};
