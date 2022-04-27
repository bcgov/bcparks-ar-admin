import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { formulaResult } from 'src/app/services/formula.service';

@Component({
  selector: 'app-boating-section',
  templateUrl: './boating-section.component.html',
  styleUrls: ['./boating-section.component.scss'],
})
export class BoatingSectionComponent implements OnInit {
  @Input() nightsOnDock = new FormControl;
  @Input() nightsOnBuoy = new FormControl;
  @Input() miscellaneousBoats = new FormControl;
  @Input() grossBoatingRevenue = new FormControl;
  @Input() attendanceTotal: formulaResult = {result: null, formula: ''};
  @Input() revenueTotal: formulaResult = {result: null, formula: ''};

  constructor() {}

  ngOnInit(): void {}
}
