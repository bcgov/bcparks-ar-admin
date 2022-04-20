import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-frontcountry-cabins-section',
  templateUrl: './frontcountry-cabins-section.component.html',
  styleUrls: ['./frontcountry-cabins-section.component.scss']
})
export class FrontcountryCabinsSectionComponent implements OnInit {
  @Input() totalAttendancePartiesField = new FormControl;
  @Input() revenueGrossCampingField = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
