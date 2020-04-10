import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor() { }

  /**
   * It could be from an api, but I'm not sure if the weather api
   * can retrieve data for all the cities and countries in the world
   */
  getCities(): Array<string> {
    return [
      'Tegucigalpa, Honduras',
      'San Pedro Sula, Honduras',
      'Bogota, Colombia',
      'Medellin, Colombia',
      'Quito, Ecuador',
    ];
  }
}
