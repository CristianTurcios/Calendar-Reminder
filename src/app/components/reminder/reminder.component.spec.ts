import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReminderComponent } from './reminder.component';
import { ModalContentComponent } from './reminder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesService } from 'src/app/services/cities.service';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { of } from 'rxjs/internal/observable/of';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

describe('ReminderComponent', () => {
  let fixture: ComponentFixture<ModalContentComponent>;
  const mockCitiesService = jasmine.createSpyObj(['getCities']);
  const mockWeatherForecastService = jasmine.createSpyObj(['getWeatherByCity']);

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
      ]
    });
    fixture = TestBed.createComponent(ModalContentComponent);
  });

  it('should call updateHero when save is called', fakeAsync(() => {
    mockWeatherForecastService.getWeatherByCity.and.returnValue(of({}));
    fixture.detectChanges();
    fixture.componentInstance.onSubmit();
    flush();
    expect(mockWeatherForecastService.updateHero).toHaveBeenCalled();
  }));
});
