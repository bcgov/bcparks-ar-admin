import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-backcountry-cabins-section',
  templateUrl: './backcountry-cabins-section.component.html',
  styleUrls: ['./backcountry-cabins-section.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss'],
})
export class BackcountryCabinsSectionComponent implements OnInit {
  @Input() adultAttendance = new UntypedFormControl;
  @Input() childAttendance = new UntypedFormControl;
  @Input() familyAttendance = new UntypedFormControl;
  @Input() grossBackcountryCabinsRevenue = new UntypedFormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() {}

  ngOnInit(): void {}
}
