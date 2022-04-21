import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfiniteLoadingBarService {
  public fetchCount = new BehaviorSubject(0);

  constructor() {}

  incrementFetchCount() {
    this.fetchCount.next(this.fetchCount.value + 1);
  }
  decrimentFetchCount() {
    this.fetchCount.next(this.fetchCount.value - 1);
  }

  getFetchCount() {
    return this.fetchCount.asObservable();
  }
}
