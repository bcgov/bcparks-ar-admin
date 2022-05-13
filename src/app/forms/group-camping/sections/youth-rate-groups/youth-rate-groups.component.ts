import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-youth-rate-groups',
  templateUrl: './youth-rate-groups.component.html',
  styleUrls: ['./youth-rate-groups.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class YouthRateGroupsComponent implements OnInit {
  @Input() youthRateGroupsAttendanceGroupNightsField = new FormControl;
  @Input() youthRateGroupsAttendancePeopleField = new FormControl;
  @Input() youthRateGroupsRevenueGrossField = new FormControl;
  @Input() revenueTotal: formulaResult = { result: null, formula: '' };

  constructor() { }

  ngOnInit(): void {
  }

}
