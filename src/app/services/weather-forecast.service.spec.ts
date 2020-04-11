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
    req.flush({
      data: [
        {
          moonrise_ts: 0,
          wind_cdir: '',
          rh: 0,
          pres: 0,
          high_temp: 0,
          sunset_ts: 0,
          ozone: 0,
          moon_phase: 0,
          wind_gust_spd: 0,
          snow_depth: 0,
          clouds: 0,
          ts: 0,
          sunrise_ts: 0,
          app_min_temp: 0,
          wind_spd: 0,
          pop: 0,
          wind_cdir_full: '',
          slp: 0,
          moon_phase_lunation: 0,
          valid_date: '',
          app_max_temp: 0,
          vis: 0,
          dewpt: 0,
          snow: 0,
          uv: 0,
          weather: {
            icon: '',
            code: 0,
            description: ''
          },
          wind_dir: 0,
          max_dhi: 0,
          clouds_hi: 0,
          precip: 0,
          low_temp: 0,
          max_temp: 0,
          moonset_ts: 0,
          datetime: '',
          temp: 0,
          min_temp: 0,
          clouds_mid: 0,
          clouds_low: 0,
        }
      ],
      city_name: '',
      lon: '',
      timezone: '',
      lat: '',
      country_code: '',
      state_code: ''
    });
    httpTestingController.verify();
  });
});
