import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-boating-section',
  templateUrl: './boating-section.component.html',
  styleUrls: ['./boating-section.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss'],
})
export class BoatingSectionComponent implements OnInit {
  @Input() nightsOnDock = new UntypedFormControl;
  @Input() nightsOnBuoy = new UntypedFormControl;
  @Input() miscellaneousBoats = new UntypedFormControl;
  @Input() grossBoatingRevenue = new UntypedFormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() {}

  ngOnInit(): void {}
}
