import { Component, Input, OnInit, inject } from '@angular/core';
import {
  formulaResult,
  FormulaService,
} from 'src/app/services/formula.service';
import { CalculationDisplayComponent } from '../../forms/calculation-display/calculation-display.component';
import { CurrencyPipe } from '@angular/common';

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
    imports: [CalculationDisplayComponent, CurrencyPipe]
})
export class SummarySectionComponent implements OnInit {
  private formulaService = inject(FormulaService);

  @Input() section: summarySection = {};

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
