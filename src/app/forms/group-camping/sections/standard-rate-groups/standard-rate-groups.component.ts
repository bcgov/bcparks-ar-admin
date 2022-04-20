import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

}
