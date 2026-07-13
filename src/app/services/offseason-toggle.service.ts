import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffSeasonToggleService {
  private offSeason = new BehaviorSubject(false);

  get getOffSeasonToggle() {
    return this.offSeason.asObservable();
  }

  setOffSeasonToggle(value: boolean) {
    this.offSeason.next(value);
  }
}
