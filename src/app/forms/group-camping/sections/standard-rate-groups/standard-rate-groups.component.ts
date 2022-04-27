import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-standard-rate-groups',
  templateUrl: './standard-rate-groups.component.html',
  styleUrls: ['./standard-rate-groups.component.scss']
})
export class StandardRateGroupsComponent implements OnInit {
  @Input() standardRateGroupsTotalPeopleStandardField = new FormControl;
  @Input() standardRateGroupsTotalPeopleAdultsField = new FormControl;
  @Input() standardRateGroupsTotalPeopleYouthField = new FormControl;
  @Input() standardRateGroupsTotalPeopleKidsField = new FormControl;
  @Input() standardRateGroupsRevenueGrossField = new FormControl;
  @Input() attendanceTotal: formulaResult = { result: null, formula: '' };
  @Input() revenueTotal: formulaResult = { result: null, formula: '' };

  constructor() { }

  ngOnInit(): void {
  }

}
