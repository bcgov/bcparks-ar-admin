import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-frontcountry-cabins-section',
  templateUrl: './frontcountry-cabins-section.component.html',
  styleUrls: ['./frontcountry-cabins-section.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class FrontcountryCabinsSectionComponent implements OnInit {
  @Input() totalAttendancePartiesField = new UntypedFormControl;
  @Input() revenueGrossCampingField = new UntypedFormControl;
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
