import { Component, Input, OnInit } from '@angular/core';
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';

export interface summaryLineItem {
  itemName: string;
  value?: number;
  variance?: boolean
}

export interface summarySection {
  title?: string;
  subtitle?: string;
  isLegacy?: boolean;
  attendanceLabel?: string;
  attendanceTotal?: formulaResult;
  attendanceItems?: Array<summaryLineItem>;
  revenueLabel?: string;
  revenueItems?: Array<summaryLineItem>;
  revenueTotal?: formulaResult;
}

@Component({
  selector: 'app-summary-section',
  templateUrl: './summary-section.component.html',
  styleUrls: ['./summary-section.component.scss'],
})
export class SummarySectionComponent implements OnInit {
  @Input() section: summarySection = {};

  constructor(private formulaService: FormulaService) {}

  ngOnInit(): void {
    if (!this.section.attendanceLabel) {
      this.section.attendanceLabel = 'Attendance';
    }
    if (!this.section.revenueLabel) {
      this.section.revenueLabel = 'Revenue';
    }
  }

  // need this to check if value is `0` (truthy)
  isDefined(value) {
    return this.formulaService.isValidNumber(value);
  }
}
