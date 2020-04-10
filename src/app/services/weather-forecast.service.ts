import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IWeatherForecast } from '../interfaces/IWeatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor(
    public http: HttpClient,
  ) { }

  getWeatherByCity(data): Observable<IWeatherForecast> {
    const city = data.split(',')[0].trim();
    const country = data.split(',')[1].trim();
    const params = {
      city,
      country,
      key: environment.API_KEY
    };
    const url = `${environment.API_WEATHER}`;
    return this.http.get<IWeatherForecast>(url, { params });
  }
}
