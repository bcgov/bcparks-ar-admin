import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-additional-vehicles',
  templateUrl: './additional-vehicles.component.html',
  styleUrls: ['./additional-vehicles.component.scss']
})
export class AdditionalVehiclesComponent implements OnInit {
  @Input() secondCarsAttendanceStandardField = new FormControl;
  @Input() secondCarsAttendanceSeniorField = new FormControl;
  @Input() secondCarsAttendanceSocialField = new FormControl;
  @Input() secondCarsRevenueGrossField = new FormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
