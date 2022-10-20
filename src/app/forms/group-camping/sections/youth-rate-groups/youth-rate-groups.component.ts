import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-youth-rate-groups',
  templateUrl: './youth-rate-groups.component.html',
  styleUrls: ['./youth-rate-groups.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class YouthRateGroupsComponent implements OnInit {
  @Input() youthRateGroupsAttendanceGroupNightsField = new UntypedFormControl;
  @Input() youthRateGroupsAttendancePeopleField = new UntypedFormControl;
  @Input() youthRateGroupsRevenueGrossField = new UntypedFormControl;
  @Input() revenueTotal: formulaResult = { result: null, formula: '' };

  constructor() { }

  ngOnInit(): void {
  }

}
