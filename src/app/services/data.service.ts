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
    this.checkIfDataExists(id);
    this.data[id].next(value);
  }

  public getItemValue(id) {
    this.checkIfDataExists(id);
    return this.data[id].asObservable();
  }

  clearItemValue(id): void {
    this.setItemValue(id, null);
  }

  checkIfDataExists(id) {
    if (!this.data[id]) {
      this.initItem(id);
    }
  }
}
