import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-other-frontcountry-camping-revenue',
  templateUrl: './other-frontcountry-camping-revenue.component.html',
  styleUrls: ['./other-frontcountry-camping-revenue.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss'],
})
export class OtherFrontcountryCampingRevenueComponent implements OnInit {
  @Input() otherRevenueGrossSaniField = new UntypedFormControl();
  @Input() otherRevenueElectricalField = new UntypedFormControl();
  @Input() otherRevenueShowerField = new UntypedFormControl();
  @Input() attendanceTotal: formulaResult = { result: null, formula: '' };
  @Input() revenueTotal: formulaResult = { result: null, formula: '' };

  constructor() {}

  ngOnInit(): void {}
}
