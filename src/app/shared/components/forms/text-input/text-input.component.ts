import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() type = 'text'; // text, number
  @Input() control = new FormControl;
  @Input() label;
  @Input() icon;
  @Input() placeholder;
  @Input() id;
  @Input() ariaLabel;
  @Input() ariaDescribedBy;
  @Input() moneyMode = false;

  constructor() {}

  ngOnInit(): void {}
}
