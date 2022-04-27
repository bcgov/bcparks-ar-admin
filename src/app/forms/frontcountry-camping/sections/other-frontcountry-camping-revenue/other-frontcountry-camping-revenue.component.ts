import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-other-frontcountry-camping-revenue',
  templateUrl: './other-frontcountry-camping-revenue.component.html',
  styleUrls: ['./other-frontcountry-camping-revenue.component.scss'],
})
export class OtherFrontcountryCampingRevenueComponent implements OnInit {
  @Input() otherRevenueGrossSaniField = new FormControl();
  @Input() otherRevenueElectricalField = new FormControl();
  @Input() otherRevenueShowerField = new FormControl();
  @Input() attendanceTotal: formulaResult = { result: null, formula: '' };
  @Input() revenueTotal: formulaResult = { result: null, formula: '' };

  constructor() {}

  ngOnInit(): void {}
}
