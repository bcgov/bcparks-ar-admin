import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffSeasonCarToggleService {
  private offSeasonCar = new BehaviorSubject(false);

  get getOffSeasonCarToggle() {
    return this.offSeasonCar.asObservable();
  }

  setOffSeasonCarToggle(value: boolean) {
    this.offSeasonCar.next(value);
  }
}
