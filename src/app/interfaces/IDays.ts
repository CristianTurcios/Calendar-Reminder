import * as moment from 'moment';

export interface IDays {
    date: moment.Moment;
    isInCurrentMonth: boolean;
}
