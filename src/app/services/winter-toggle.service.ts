import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WinterToggleService {
  private winter = new BehaviorSubject(false);

  get getWinterToggle() {
    return this.winter.asObservable();
  }

  setWinterToggle(value: boolean) {
    this.winter.next(value);
  }
}
