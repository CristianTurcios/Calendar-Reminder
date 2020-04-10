import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWeatherForecast } from '../interfaces/IWeatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor(
    public http: HttpClient,
  ) { }

  getWeatherByCity(data, date: string): Observable<any> {
    const city = data.split(',')[0].trim();
    const country = data.split(',')[1].trim();
    const params = {
      city,
      country,
      key: environment.API_KEY
    };
    const url = `${environment.API_WEATHER}`;
    return this.http.get<IWeatherForecast>(url, { params }).pipe(
      map((result) => result.data.filter((element) => element.valid_date === date))
    );
  }
}
