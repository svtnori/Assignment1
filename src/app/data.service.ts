import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
 
  fetchData(authenticate: boolean): Promise<string> {
    return new Promise((resolve, reject) => {
      if (authenticate) {
        setTimeout(() => {
          resolve('Data fetched successfully.');
        }, 2000);
      } else {
        setTimeout(() => {
          reject('Access Denied.');
        }, 2000);
      }
    });
  }
}
