import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  @Input() charCap;
  @Input() label;
  @Input() id;
  @Input() text = '';

  constructor() {}

  ngOnInit(): void {}
}
