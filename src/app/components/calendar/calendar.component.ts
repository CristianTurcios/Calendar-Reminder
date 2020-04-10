import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IDays } from 'src/app/interfaces/IDays';
import { Store } from '@ngrx/store';
import * as fromApp from '../../redux/reducers/index.reducer';
import * as CalendarActions from '../../redux/actions/calendar.actions';
import * as ReminderActions from '../../redux/actions/reminders.actions';

import {
  faTrashAlt, faChevronLeft, faChevronRight, faCalendarPlus, IconDefinition
 } from '@fortawesome/free-solid-svg-icons';
import { IReminder } from 'src/app/interfaces/IReminder';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  isEditing: boolean;
  isDeleting: boolean;
  faTrashAlt: IconDefinition;
  faChevronLeft: IconDefinition;
  faChevronRight: IconDefinition;
  faCalendarPlus: IconDefinition;

  daysOfWeek: Array<string>;
  monthToDisplay: moment.Moment;
  daysOfMonth$: Observable<{ calendar: Array<IDays> }>;
  reminders$: Observable<{ reminders: Array<IReminder> }>;

  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.monthToDisplay = moment();
    this.faTrashAlt = faTrashAlt;
    this.faChevronLeft = faChevronLeft;
    this.faChevronRight = faChevronRight;
    this.faCalendarPlus =  faCalendarPlus;
    this.reminders$ = this.store.select('reminder');
    this.daysOfMonth$ = this.store.select('calendar');
    this.daysOfWeek = this.getDaysOfWeek();
    this.generateCalendar(this.monthToDisplay);
  }

  /**
   * getActualDate function return and string wich represent month and year selected by the user
   * by default the function will return the current month and year
   */
  getActualDate(): string {
    const nameActualYear = moment().date(1).year(this.monthToDisplay.year()).format('YYYY');
    const nameActualMonth = moment().date(1).month(this.monthToDisplay.month()).format('MMM');
    return `${nameActualMonth} ${nameActualYear}`;
  }

  /**
   * getDaysOfWeek function provide the ability to generate the days of week using moment library
   * this function return an array of string with the days of week.
   * It will be used in the html to render days from Sunday to Saturday
   */
  getDaysOfWeek(): Array<string> {
    const week = moment().startOf('week');
    const daysOfWeek = [];
    for (let index = 0; index < 7; index++) {
      daysOfWeek.push(week.format('dd'));
      week.add(1, 'day').format('dd');
    }
    return daysOfWeek;
  }

  /**
   * generateCalendar function provide the ability to generate the days of specific month
   * also determine if a day is in the current month, if not, in the html the day will be shown in different color
   * @param monthToDisplay: type moment.Moment
   */
  generateCalendar(monthToDisplay: moment.Moment): void {
    this.store.dispatch(new CalendarActions.RestarCalendar());

    const firtsDayOfCalendar = moment().date(1).month(monthToDisplay.month()).year(monthToDisplay.year());
    const lastDayOfCalendar = moment().date(1).month(monthToDisplay.month()).year(monthToDisplay.year()).endOf('month');

    // Find the firts date that will be shown in the calendar
    while (firtsDayOfCalendar.day() !== 0) {
      firtsDayOfCalendar.subtract(1, 'days');
    }

    // Find the last date that will be shown in the calendar
    while (lastDayOfCalendar.day() !== 6) {
      lastDayOfCalendar.add(1, 'days');
    }

    do {
      this.store.dispatch(new CalendarActions.AddDay({
        date: moment(firtsDayOfCalendar),
        isInCurrentMonth: firtsDayOfCalendar.month() === monthToDisplay.month()
      }));
      firtsDayOfCalendar.add(1, 'days');
    } while (firtsDayOfCalendar.isSameOrBefore(lastDayOfCalendar));
  }

  /**
   * changeMonth function provide the ability to add or substract a month using momentjs library
   * add or substract a month give the opportunity to change between months and use the function genereteCalendar
   * to calculate the new days of the month selected
   * @param isNext if true, add new month Jan => Feb, if false substract month Feb => Jan
   */
  changeMonth(isNext: boolean): void {
    if (isNext) {
      this.monthToDisplay.add(1, 'months');
    } else {
      this.monthToDisplay.subtract(1, 'months');
    }
    this.getActualDate();
    this.generateCalendar(this.monthToDisplay);
  }

  /**
   * function that return a boolean,
   * if true it means that the day receive as a param is the actual day in the calendar
   * @param day specific day in the calendar
   */
  checkIfIsActualDay(day: moment.Moment): boolean {
    return day.isSame(moment(), 'day');
  }

  /**
   * function that emit an action to the store to open modal and pass the dayOfMonth selected
   * @param dayOfMonth selected by the user where it will be added or edited an event
   */
  openModal(dayOfMonth: IDays = { date: moment(), isInCurrentMonth: false }): void {
    if (!this.isEditing && !this.isDeleting) {
      this.store.dispatch(new ReminderActions.OpenModal(dayOfMonth));
    }
  }

  checkIfReminderIsInTheCurrentDate(actualDate: moment.Moment, reminderDate: moment.Moment): boolean {
    return actualDate.isSame(reminderDate, 'day');
  }

  editReminder(reminder: IReminder): void {
    console.log('reminder', reminder);
    this.isEditing = true;
    this.store.dispatch(new ReminderActions.EditReminder(reminder));
    setTimeout(() => this.isEditing = false, 1);
  }

  deleteReminder(index: number): void {
    this.isDeleting = true;
    this.store.dispatch(new ReminderActions.DeleteReminder(index));
    setTimeout(() => this.isDeleting = false, 1);
  }

  deleteAllReminders(): void {
    this.store.dispatch(new ReminderActions.DeleteAllReminders());
  }
}
