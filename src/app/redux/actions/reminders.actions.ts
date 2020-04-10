import { Action } from '@ngrx/store';
import { IReminder } from 'src/app/interfaces/IReminder';
import * as moment from 'moment';
import { IDays } from 'src/app/interfaces/IDays';

export const ADD_REMINDER = '[Reminder] Add Reminders';
export const EDIT_REMINDER = '[Reminder] Edit Reminders';
export const OPEN_MODAL = '[Reminder] Open Modal';
export const CLOSE_MODAL = '[Reminder] Close Modal';
export const DELETE_REMINDER = '[Reminders] Delete Reminders';
export const STOP_EDIT_REMINDER = '[Reminders] Stop Edit Reminders';
export const DELETE_ALL_REMINDERS = '[Reminders] Delete All Reminders';

export class AddReminder implements Action {
    readonly type = ADD_REMINDER;
    constructor(public payload: IReminder) {
        this.payload.date = moment(this.payload.date);
        this.payload.hour = moment(this.payload.date).format('HH:mm');
    }
}

export class EditReminder implements Action {
    readonly type = EDIT_REMINDER;
    constructor(public payload: IReminder) { }
}

export class StopEditReminder implements Action {
    readonly type = STOP_EDIT_REMINDER;
    constructor() { }
}

export class DeleteReminder implements Action {
    readonly type = DELETE_REMINDER;
    constructor(public payload: number) { }
}

export class DeleteAllReminders implements Action {
    readonly type = DELETE_ALL_REMINDERS;
    constructor() { }
}

export class OpenModal implements Action {
    readonly type = OPEN_MODAL;
    constructor(public payload: IDays) { }
}

export type ReminderActions =
    | AddReminder
    | EditReminder
    | StopEditReminder
    | DeleteReminder
    | OpenModal
    | DeleteAllReminders;
