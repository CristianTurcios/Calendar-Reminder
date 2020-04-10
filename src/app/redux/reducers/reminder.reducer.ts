import * as ReminderActions from '../actions/reminders.actions';
import { IReminder } from 'src/app/interfaces/IReminder';
import { IDays } from 'src/app/interfaces/IDays';
import * as moment from 'moment';

export interface State {
    reminders: IReminder[];
    editedReminder: IReminder;
    dayOfMonth: IDays;
}
export const initialState: State = {
    reminders: new Array<IReminder>(),
    editedReminder: null,
    dayOfMonth: null
};

export function reminderReducer(state: State = initialState, action: ReminderActions.ReminderActions) {
    switch (action.type) {
        case ReminderActions.ADD_REMINDER:
            const index: number = state.reminders.indexOf(state.reminders.find(element => element.id === action.payload.id));
            console.log('action.payload', action.payload);
            if (index === -1) {
                let updatedReminders = [...state.reminders, action.payload];
                updatedReminders = updatedReminders.sort((current, next) => {
                    return moment(current.date).isSameOrBefore(next.date) ? -1 : 1;
                });
                return {
                    ...state,
                    reminders: updatedReminders
                };
            } else {
                const reminder = state.reminders[index];
                const updatedReminder = {
                    ...reminder,
                    ...action.payload
                };
                let updatedReminders = [...state.reminders];
                updatedReminders[index] = updatedReminder;

                updatedReminders = updatedReminders.sort((current, next) => {
                    return moment(current.date).isSameOrBefore(next.date) ? -1 : 1;
                });
                return {
                    ...state,
                    reminders: updatedReminders
                };
            }
        case ReminderActions.EDIT_REMINDER:
            return {
                ...state,
                editedReminder: action.payload
            };
        case ReminderActions.STOP_EDIT_REMINDER:
            return {
                ...state,
                editedReminder: null,
                dayOfMonth: null
            };
        case ReminderActions.DELETE_REMINDER:
            return {
                ...state,
                reminders: state.reminders.filter((element: IReminder, indexElement: number) => indexElement !== action.payload),
                editedReminder: null,
                dayOfMonth: null
            };
        case ReminderActions.DELETE_ALL_REMINDERS:
            return {
                ...state,
                reminders: []
            };
        case ReminderActions.OPEN_MODAL:
            return {
                ...state,
                dayOfMonth: action.payload
            };
        default:
            return state;
    }
}
