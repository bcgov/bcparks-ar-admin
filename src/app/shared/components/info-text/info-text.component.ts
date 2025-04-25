import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-info-text',
    templateUrl: './info-text.component.html',
    styleUrls: ['./info-text.component.scss'],
    standalone: false
})
export class InfoTextComponent implements OnInit {
  @Input() text;

  constructor() {}

  ngOnInit(): void {}
}
