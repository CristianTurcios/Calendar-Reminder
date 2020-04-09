import { Action } from '@ngrx/store';
import { IDays } from 'src/app/interfaces/IDays';

export const ADD_DAY = '[Calendar] Add Day';
export const RESTART_CALENDAR = '[Calendar] Restart calendar';

export class AddDay implements Action {
    readonly type = ADD_DAY;
    constructor(public payload: IDays) {}
}

export class RestarCalendar implements Action {
    readonly type = RESTART_CALENDAR;
    constructor() { }
}

export type CalendarActions =
    | AddDay
    | RestarCalendar;
