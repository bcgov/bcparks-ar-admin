import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-centered-text-block',
  templateUrl: './centered-text-block.component.html',
  styleUrls: ['./centered-text-block.component.scss'],
})
export class CenteredTextBlockComponent implements OnInit {
  @Input() text;
  constructor() {}

  ngOnInit(): void {}
}
