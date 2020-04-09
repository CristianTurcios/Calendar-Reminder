import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { IDays } from 'src/app/interfaces/IDays';
import { Store } from '@ngrx/store';
import * as fromApp from '../../redux/reducers/index.reducer';
import * as CalendarActions from '../../redux/actions/calendar.actions';
import { faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  faChevronLeft: IconDefinition;
  faChevronRight: IconDefinition;
  daysOfWeek: Array<string>;
  monthToDisplay: moment.Moment;
  daysOfMonth$: Observable<{ calendar: Array<IDays> }>;

  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.monthToDisplay = moment();
    this.faChevronLeft = faChevronLeft;
    this.faChevronRight = faChevronRight;
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
}
