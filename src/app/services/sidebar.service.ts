import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter();

  public hide = false;

  constructor() {}

  toggle() {
    this.hide = !this.hide;
    this.toggleChange.emit(this.hide);
  }

  close() {
    this.hide = true;
    this.toggleChange.emit(this.hide);
  }
}
