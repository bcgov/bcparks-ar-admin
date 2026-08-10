import { Injectable, inject } from '@angular/core';

import { FiscalYearLockService } from '../services/fiscal-year-lock.service';

@Injectable({
  providedIn: 'root'
})
export class LockRecordsResolver  {
  private fiscalYearLockService = inject(FiscalYearLockService);

  resolve() {
    this.fiscalYearLockService.fetchFiscalYear();
  }
}

