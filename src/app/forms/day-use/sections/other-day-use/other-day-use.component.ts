import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-other-day-use',
  templateUrl: './other-day-use.component.html',
  styleUrls: ['./other-day-use.component.scss']
})
export class OtherDayUseComponent implements OnInit {
  @Input() otherDayUseRevenueSkiiField = new FormControl;
  @Input() otherDayUseRevenueHotSpringsField = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
