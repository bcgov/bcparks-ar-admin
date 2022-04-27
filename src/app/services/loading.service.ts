import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public fetchList = new BehaviorSubject({});
  public fetchCount = new BehaviorSubject(1);

  constructor() {}

  addToFetchList(id, attributes = { loading: true }) {
    let obj = { ...this.fetchList.value };
    obj[id] = attributes;
    this.fetchList.next(obj);
    this.updateFetchCount();
  }

  removeToFetchList(id) {
    let obj = { ...this.fetchList.value };
    delete obj[id];
    this.fetchList.next(obj);
    this.updateFetchCount();
  }

  updateFetchCount() {
    this.fetchCount.next(Object.keys(this.fetchList.value).length);
  }

  getFetchList() {
    return this.fetchList.asObservable();
  }

  getFetchCount() {
    return this.fetchCount.asObservable();
  }
}
