import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-backcountry-camping-section',
  templateUrl: './backcountry-camping-section.component.html',
  styleUrls: ['./backcountry-camping-section.component.scss', '../../../../shared/components/forms/base-form/base-form.component.scss']
})
export class BackcountryCampingSectionComponent implements OnInit {
  @Input() peopleField = new UntypedFormControl; 
  @Input() grossCampingRevenueField = new UntypedFormControl; 
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() { }

  ngOnInit(): void {
  }

}
