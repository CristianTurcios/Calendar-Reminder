import * as CalendarActions from '../actions/calendar.actions';
import { IDays } from 'src/app/interfaces/IDays';

export interface State {
    calendar: IDays[];
}
export const initialState: State = {
    calendar: new Array<IDays>()
};

export function calendarReducer(state: State = initialState, action: CalendarActions.CalendarActions) {
    switch (action.type) {
        case CalendarActions.ADD_DAY:
            return {
                ...state,
                calendar: [...state.calendar, action.payload]
            };
        case CalendarActions.RESTART_CALENDAR:
            return {
                ...state,
                calendar: []
            };
        default:
            return state;
    }
}
