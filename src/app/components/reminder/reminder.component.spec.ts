import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { ModalContentComponent } from './reminder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesService } from 'src/app/services/cities.service';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IReminder } from 'src/app/interfaces/IReminder';
import * as moment from 'moment';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ReminderComponent', () => {
  let fixture: ComponentFixture<ModalContentComponent>;
  const mockCitiesService = jasmine.createSpyObj(['getCities']);
  const mockWeatherForecastService = jasmine.createSpyObj(['getWeatherByCity']);
  const mockBsModalRef = jasmine.createSpyObj(['hide']);
  let store: MockStore;
  const initialState = {
    reminders: new Array<IReminder>(),
    editedReminder: null,
    dayOfMonth: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
      ],
      declarations: [ModalContentComponent],
      providers: [
        { provide: CitiesService, useValue: mockCitiesService },
        { provide: WeatherForecastService, useValue: mockWeatherForecastService },
        { provide: BsModalRef, useValue: mockBsModalRef},
        provideMockStore({ initialState }),
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ModalContentComponent);
    store = TestBed.inject(MockStore);
  });

  it('should add a new reminder', fakeAsync(() => {
    mockWeatherForecastService.getWeatherByCity.and.returnValue(of({}));
    fixture.componentInstance.reminder = {
      id: moment().hours(0).minutes(0).seconds(0).valueOf(),
      name: 'Test Reminder',
      city: 'Tegucigalpa, Honduras',
      date: moment(),
      hour: moment().format('HH:mm'),
      color: '#28a745',
      weather: ''
    };
    fixture.detectChanges();

    fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.addForm.valid).toBeTrue();
  }));

  it('should not add a new reminder because reminder name exceed of 30 characters', fakeAsync(() => {
    mockWeatherForecastService.getWeatherByCity.and.returnValue(of({}));
    fixture.componentInstance.reminder = {
      id: moment().hours(0).minutes(0).seconds(0).valueOf(),
      name: 'Long name of reminder, should not be a valid form because exceed the character length allowed',
      city: 'Tegucigalpa, Honduras',
      date: moment(),
      hour: moment().format('HH:mm'),
      color: '#28a745',
      weather: ''
    };
    fixture.detectChanges();

    fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.addForm.valid).toBeFalse();
  }));

  it('should not add a new reminder because city is not selected', fakeAsync(() => {
    mockWeatherForecastService.getWeatherByCity.and.returnValue(of({}));
    fixture.componentInstance.reminder = {
      id: moment().hours(0).minutes(0).seconds(0).valueOf(),
      name: 'Test Reminder',
      city: '',
      date: moment(),
      hour: moment().format('HH:mm'),
      color: '#28a745',
      weather: ''
    };
    fixture.detectChanges();

    fixture.componentInstance.onSubmit();
    expect(fixture.componentInstance.addForm.valid).toBeFalse();
  }));
});
