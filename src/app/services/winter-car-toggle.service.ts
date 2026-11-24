import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WinterCarToggleService {
  private winterCar = new BehaviorSubject(false);

  get getWinterCarToggle() {
    return this.winterCar.asObservable();
  }

  setWinterCarToggle(value: boolean) {
    this.winterCar.next(value);
  }
}
