import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data;

  constructor() {
    this.data = {};
  }

  initItem(id): void {
    this.data[id] = new BehaviorSubject(null);
  }

  setItemValue(id, value): void {
    this.checkIfDataExists(id) ? null : this.initItem(id);
    this.data[id].next(value);
  }

  // For observables - watch for changes in dataid
  public watchItem(id) {
    this.checkIfDataExists(id) ? null : this.initItem(id);
    return this.data[id];
  }
  // For getting the current value of dataid
  public getItemValue(id) {
    this.checkIfDataExists(id) ? null : this.initItem(id);
    return this.data[id].value;
  }

  // concatenate new value to existing array value of dataid
  public appendItemValue(id, value) {
    this.checkIfDataExists(id) ? null : this.initItem(id);
    if (!this.getItemValue(id)) {
      this.setItemValue(id, value);
    } else {
      const appendObj = this.getItemValue(id).concat(value)
      this.data[id].next(appendObj);
    }
    return this.getItemValue(id);
  }

  clearItemValue(id): void {
    this.setItemValue(id, null);
  }

  checkIfDataExists(id) {
    return this.data[id] ? true : false;
  }
}
