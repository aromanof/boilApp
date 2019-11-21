import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getCurrentDate(): string {
    return new Date().toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })
  }
}
