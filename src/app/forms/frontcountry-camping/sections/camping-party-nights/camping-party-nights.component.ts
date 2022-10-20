import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-camping-party-nights',
  templateUrl: './camping-party-nights.component.html',
  styleUrls: ['./camping-party-nights.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})

export class CampingPartyNightsComponent implements OnInit {
  @Input() campingPartyNightsAttendanceStandardField = new UntypedFormControl;
  @Input() campingPartyNightsAttendanceSeniorField = new UntypedFormControl;
  @Input() campingPartyNightsAttendanceSocialField = new UntypedFormControl;
  @Input() campingPartyNightsAttendanceLongStayField = new UntypedFormControl;
  @Input() campingPartyNightsRevenueGrossField = new UntypedFormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
