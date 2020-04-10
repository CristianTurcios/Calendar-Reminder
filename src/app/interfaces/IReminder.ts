import * as moment from 'moment';

export interface IReminder {
    id: number;
    name: string;
    city: string;
    date: moment.Moment;
    hour: string;
    color: string;
    weather: any;
}
