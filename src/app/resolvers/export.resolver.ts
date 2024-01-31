import { Injectable } from '@angular/core';

import { ExportService } from '../services/export.service';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ExportResolver  {
  constructor(private exportService: ExportService) {}
  resolve() {
    this.exportService.checkForReports(Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard');
  }
}
