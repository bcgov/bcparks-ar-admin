import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-backcountry-cabins-section',
  templateUrl: './backcountry-cabins-section.component.html',
  styleUrls: ['./backcountry-cabins-section.component.scss'],
})
export class BackcountryCabinsSectionComponent implements OnInit {
  @Input() adultAttendance = new FormControl;
  @Input() childAttendance = new FormControl;
  @Input() familyAttendance = new FormControl;
  @Input() grossBackcountryCabinsRevenue = new FormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() {}

  ngOnInit(): void {}
}
