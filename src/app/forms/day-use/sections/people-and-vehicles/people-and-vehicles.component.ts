import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-people-and-vehicles',
  templateUrl: './people-and-vehicles.component.html',
  styleUrls: ['./people-and-vehicles.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class PeopleAndVehiclesComponent implements OnInit {
  @Input() peopleAndVehiclesTrailField = new UntypedFormControl;
  @Input() peopleAndVehiclesVehicleField = new UntypedFormControl;
  @Input() peopleAndVehiclesBusField = new UntypedFormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
