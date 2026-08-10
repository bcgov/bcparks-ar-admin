import { Injectable, inject } from '@angular/core';

import { ExportService } from '../services/export.service';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ExportResolver  {
  private exportService = inject(ExportService);

  resolve() {
    this.exportService.checkForReports(Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard');
  }
}
