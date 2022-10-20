import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-standard-rate-groups',
  templateUrl: './standard-rate-groups.component.html',
  styleUrls: ['./standard-rate-groups.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class StandardRateGroupsComponent implements OnInit {
  @Input() standardRateGroupsTotalPeopleStandardField = new UntypedFormControl;
  @Input() standardRateGroupsTotalPeopleAdultsField = new UntypedFormControl;
  @Input() standardRateGroupsTotalPeopleYouthField = new UntypedFormControl;
  @Input() standardRateGroupsTotalPeopleKidsField = new UntypedFormControl;
  @Input() standardRateGroupsRevenueGrossField = new UntypedFormControl;
  @Input() attendanceTotal: formulaResult = { result: null, formula: '' };
  @Input() revenueTotal: formulaResult = { result: null, formula: '' };

  constructor() { }

  ngOnInit(): void {
  }

}
