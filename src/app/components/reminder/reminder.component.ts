import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ReminderActions from '../../redux/actions/reminders.actions';
import * as fromApp from '../../redux/reducers/index.reducer';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import { IReminder } from 'src/app/interfaces/IReminder';
import { IDays } from 'src/app/interfaces/IDays';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { IWeatherForecastData } from 'src/app/interfaces/IWeatherForecast';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  subscription: Subscription;

  constructor(
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('reminder').subscribe(stateData => {
      if (stateData.editedReminder) {
        this.openModal(stateData.editedReminder, 'Edit Reminder');
      } else if (stateData.dayOfMonth) {
        const reminder = {
          id: moment().hours(0).minutes(0).seconds(0).valueOf(),
          name: '',
          city: '',
          date: stateData.dayOfMonth.date,
          hour: moment().format('HH:mm'),
          color: '#28a745',
          weather: ''
        };
        this.openModal(reminder, 'Add New Event');
      }
    });
  }

  /**
   *
   * @param reminder can be two different cases, this reminder can be edited or the user is creating a new reminder
   * @param title to be shown in the modal can be Add or Edit reminder
   */
  openModal(reminder: IReminder, title: string): void {
    const initialState = { reminder, title };
    this.bsModalRef = this.modalService.show(ModalContentComponent, { initialState });
  }

  /**
   * Part of the cicly of life of angular applications and will unsubscribe the subscription of the store
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

/* This is a component which we pass in modal*/
@Component({
  selector: 'app-modal-reminder',
  templateUrl: './reminder-modal.component.html',
})

export class ModalContentComponent implements OnInit {
  addForm: FormGroup;
  bsValue: Date;
  bsRangeValue: Date[];
  maxDate: Date;
  dayOfMonth: IDays;
  cities: Array<string>;
  reminder: IReminder;
  title: string;
  color: string;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    private store: Store<fromApp.AppState>,
    private weatherForecastService: WeatherForecastService) {
    this.bsValue = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {
    this.color = this.reminder.color;
    this.cities = this.citiesService.getCities();
    const year = this.reminder.date.year();
    const month = this.reminder.date.month();
    const day = this.reminder.date.date();
    const hour = this.reminder.hour.split(':');
    this.addForm = this.formBuilder.group({
      name: [this.reminder.name, [Validators.required, Validators.maxLength(30)]],
      color: [''],
      city: [this.reminder.city, Validators.required],
      date: [new Date(year, month, day, parseInt(hour[0], 10), parseInt(hour[1], 10)), Validators.required],
      hour: [new Date(year, month, day, parseInt(hour[0], 10), parseInt(hour[1], 10)), Validators.required],
    });
  }

  /**
   * When the user finish to add or edit a new reminder if the form is valid
   * this function will send a new reminder and will be stored in the store of reminders
   */
  onSubmit(): void {
    if (this.addForm.valid) {
      this.closeModal();
      this.addForm.value.id = this.reminder.id;
      this.addForm.value.color = this.color;
      this.store.dispatch(new ReminderActions.StopEditReminder());
      this.weatherForecastService.getWeatherByCity(
        this.addForm.value.city,
        moment(this.addForm.value.date).format('YYYY-MM-DD')
      ).subscribe((response: Array<IWeatherForecastData>) => {
        this.addForm.value.weather = response.length > 0 ?
          `${environment.WEATHER_ICONS}/${response[0].weather.icon}.png` :
          this.addForm.value.weather;
        this.store.dispatch(new ReminderActions.AddReminder(this.addForm.value));
      }, () => {
        this.addForm.value.weather = '';
        this.store.dispatch(new ReminderActions.AddReminder(this.addForm.value));
      });
    }
  }

  /**
   * Close modal when user clicked outside of the modal or the user finish of add or edit a reminder
   */
  closeModal(): void {
    this.bsModalRef.hide();
  }

  /**
   * Return form control
   */
  get f() {
    return this.addForm.controls;
  }
}
