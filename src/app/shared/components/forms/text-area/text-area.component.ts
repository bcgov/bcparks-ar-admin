import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  @Input() charCap;
  @Input() label;
  @Input() id;
  @Input() control = new FormControl;

  constructor() {}

  ngOnInit(): void {}

  getFieldLength() {
    let value: string = '';
    if (this.control) {
      value = this.control?.value || '';
    }
    return value.length;
  }
}
