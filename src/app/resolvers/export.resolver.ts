import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ExportService } from '../services/export.service';
import { Constants } from '../shared/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ExportResolver implements Resolve<void> {
  constructor(private exportService: ExportService) {}
  resolve() {
    this.exportService.pollReportStatus(
      Constants.dataIds.EXPORT_ALL_POLLING_DATA
    );
  }
}
