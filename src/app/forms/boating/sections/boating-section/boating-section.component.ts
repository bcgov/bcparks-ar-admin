import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boating-section',
  templateUrl: './boating-section.component.html',
  styleUrls: ['./boating-section.component.scss'],
})
export class BoatingSectionComponent implements OnInit {
  @Input() formControls: any;

  constructor() {}

  ngOnInit(): void {}
}
