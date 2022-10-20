import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  @Input() type = 'text'; // text, number
  @Input() control = new UntypedFormControl;
  @Input() label;
  @Input() icon;
  @Input() placeholder = "No data";
  @Input() id;
  @Input() ariaLabel;
  @Input() ariaDescribedBy;
  @Input() moneyMode = false;

  constructor() {}

  ngOnInit(): void {}

  blockInvalidChars(e){
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  }

}
