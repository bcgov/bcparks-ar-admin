import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public fetchList = new BehaviorSubject({});
  public loading = new BehaviorSubject(false);

  constructor() {}

  addToFetchList(id, attributes = { loading: true }) {
    let obj = { ...this.fetchList.value };
    obj[id] = attributes;
    this.fetchList.next(obj);
    this.updateLoadingStatus();
  }

  removeToFetchList(id) {
    let obj = { ...this.fetchList.value };
    delete obj[id];
    this.fetchList.next(obj);
    this.updateLoadingStatus();
  }

  updateLoadingStatus() {
    // We have these extra checks so we don't constantly spam the subscribers.
    if (Object.keys(this.fetchList.value).length > 0 && !this.loading.value) {
      this.loading.next(true);
    } else if (
      Object.keys(this.fetchList.value).length <= 0 &&
      this.loading.value
    ) {
      this.loading.next(false);
    }
  }

  getFetchList() {
    return this.fetchList.asObservable();
  }

  getLoadingStatus() {
    return this.loading.asObservable();
  }
}
