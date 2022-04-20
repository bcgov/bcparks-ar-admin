import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-youth-rate-groups',
  templateUrl: './youth-rate-groups.component.html',
  styleUrls: ['./youth-rate-groups.component.scss']
})
export class YouthRateGroupsComponent implements OnInit {
  @Input() youthRateGroupsAttendanceGroupNightsField = new FormControl;
  @Input() youthRateGroupsAttendancePeopleField = new FormControl;
  @Input() youthRateGroupsRevenueGrossField = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
