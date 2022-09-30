import { Component, Input } from '@angular/core';
import { FiscalYearLockService } from 'src/app/services/fiscal-year-lock.service';

@Component({
  selector: 'app-fiscal-year-unlocker',
  templateUrl: './fiscal-year-unlocker.component.html',
  styleUrls: ['./fiscal-year-unlocker.component.scss'],
})
export class FiscalYearUnlockerComponent {
  @Input() data: any;

  constructor(private fiscalYearLockService: FiscalYearLockService) {}

  unlockFiscalYear() {
    this.fiscalYearLockService.lockUnlockFiscalYear(
      this.data.year.value,
      false
    );
  }
}
