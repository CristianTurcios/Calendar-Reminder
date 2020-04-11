import { TestBed } from '@angular/core/testing';

import { WeatherForecastService } from './weather-forecast.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';


describe('WeatherForecastService', () => {
  let service: WeatherForecastService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherForecastService
      ]
    });
    service = TestBed.inject(WeatherForecastService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should call getWeatherByCity with the correct url', () => {
    service.getWeatherByCity('Tegucigalpa, Honduras', '2020-10-10').subscribe();
    const req = httpTestingController.expectOne(
      `${environment.API_WEATHER}?city=Tegucigalpa&country=Honduras&key=${environment.API_KEY}`
    );
    req.flush([{}]);
    httpTestingController.verify();
  });
});
