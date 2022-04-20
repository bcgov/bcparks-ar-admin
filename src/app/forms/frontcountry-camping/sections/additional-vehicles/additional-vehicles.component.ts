import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

}
