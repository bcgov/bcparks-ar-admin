import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { ExportService } from '../services/export.service';
import { Constants } from '../shared/utils/constants';

@Component({
  selector: 'app-export-reports',
  templateUrl: './export-reports.component.html',
  styleUrls: ['./export-reports.component.scss'],
})

// TODO: Make a component for exporter cards
export class ExportReportsComponent implements OnDestroy {
  private subscriptions = new Subscription();

  public stateDictionary = {
    STANDBY: 0,
    GENERATING: 1,
    READY_TO_DOWNLOAD: 2,
    RETRYING: 98,
    ERROR: 99,
  };

  public status = 'Standing by';
  public percentageComplete = 0;
  public progressBarTextOverride;
  public disableGenerate = false;
  public disableDownload = true;
  public animated = true;
  public currentState = 0;
  public progressBarColour = 'secondary';
  public dateGenerated;
  public signedURL;
  public fiscalYearStartMonth = 'April';
  public fiscalYearEndMonth = 'March';
  public maxDate = new Date();
  public defaultRangeString = 'Select fiscal year end';
  public fiscalYearRangeString = this.defaultRangeString;
  public modelDate = NaN;
  public activeTab = '';

  public exportMessage = 'Last export: -';

  public initialLoad = true;

  constructor(
    private exportService: ExportService,
    private dataService: DataService
  ) {
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.EXPORT_VARIANCE_POLLING_DATA).subscribe(res => {
        this.jobUpdate(res);
      })
    )
    this.subscriptions.add(
      this.dataService
        .watchItem(Constants.dataIds.EXPORT_ALL_POLLING_DATA)
        .subscribe((res) => {
          this.jobUpdate(res);
        }
        ));
  }

  jobUpdate(res) {
    if (res) {
      this.initialLoad = false;
      if (res.error) {
        if (res.error.state === 'retrying') {
          this.setState(this.stateDictionary.RETRYING);
        } else {
          this.setState(this.stateDictionary.ERROR);
          this.setExportMessage(res);
        }
        this.status = res.error.msg;
      } else {
        if (this.currentState !== 0) {
          if (res.jobObj.progressState === 'complete') {
            this.setState(this.stateDictionary.READY_TO_DOWNLOAD);
          } else {
            this.setState(this.stateDictionary.GENERATING);
          }
          this.percentageComplete = res.jobObj.progressPercentage;
          this.status = res.jobObj.progressDescription;
        }
        this.setExportMessage(res);
      }

      this.signedURL = res?.['signedURL']
        ? res?.['signedURL']
        : undefined;
    }
  }

  onOpenCalendar(container) {
    container.setViewMode('year');
  }

  datePickerOutput(event) {
    const selectedYear = new Date(event).getFullYear();
    this.modelDate = selectedYear;
    const startDate = this.fiscalYearStartMonth + ' ' + (selectedYear - 1);
    const endDate = this.fiscalYearEndMonth + ' ' + selectedYear;
    const displayRange = `${startDate}–${endDate}`;
    this.fiscalYearRangeString = displayRange;
    this.changeActiveTab('variance');
  }

  async generateReport() {
    this.setState(this.stateDictionary.GENERATING);
    this.setExportMessage(null);
    if (this.activeTab === 'variance') {
      this.exportService.generateReport(
        Constants.dataIds.EXPORT_VARIANCE_POLLING_DATA, 'variance', { fiscalYearEnd: this.modelDate }
      );
    } else {
      this.exportService.generateReport(
        Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard'
      );
    }
  }

  setState(state) {
    switch (state) {
      case 0:
        this.animated = true;
        this.status = 'Standing by';
        this.percentageComplete = 0;
        this.progressBarTextOverride = undefined;
        this.disableGenerate = this.disableGenerateButton();
        this.disableDownload = true;
        this.currentState = 0;
        this.progressBarColour = 'secondary';
        break;
      case 1:
        this.animated = true;
        this.status = 'Requesting job';
        this.percentageComplete = 0;
        this.progressBarTextOverride = undefined;
        this.disableGenerate = true;
        this.disableDownload = true;
        this.currentState = 1;
        this.progressBarColour = 'warning';
        break;
      case 2:
        this.animated = false;
        this.progressBarTextOverride = undefined;
        this.disableGenerate = false;
        this.disableDownload = false;
        this.currentState = 2;
        this.progressBarColour = 'success';
        break;
      case 98:
        this.animated = true;
        this.status = 'Error, retrying.';
        this.percentageComplete = 100;
        this.disableGenerate = true;
        this.disableDownload = true;
        this.currentState = 3;
        this.progressBarColour = 'secondary';
        this.progressBarTextOverride = 'RETRYING';
        break;
      case 99:
        this.animated = false;
        this.status = 'Error, please try again.';
        this.percentageComplete = 100;
        this.disableGenerate = false;
        this.disableDownload = false;
        this.currentState = 3;
        this.progressBarColour = 'danger';
        this.exportMessage = 'Exporter failed. Try again';
        this.progressBarTextOverride = 'ERROR';
        break;
      default:
        break;
    }
  }

  downloadReport() {
    if (this.signedURL) {
      window.open(this.signedURL, '_blank');
    }
  }

  changeActiveTab(tabId) {
    this.setState(0);
    this.activeTab = tabId;
    this.setExportMessage(null);
    if (this.activeTab === 'variance') {
      if (this.modelDate) {
        this.exportService.checkForReports(Constants.dataIds.EXPORT_VARIANCE_POLLING_DATA, 'variance', { fiscalYearEnd: this.modelDate });
      }
      return;
    }
    this.exportService.checkForReports(Constants.dataIds.EXPORT_ALL_POLLING_DATA, 'standard');
  }

  setExportMessage(res) {
    if (
      res &&
      (this.currentState === 0 ||
        this.currentState === 2 ||
        this.percentageComplete === 100)
    ) {
      if (res?.jobObj?.dateGenerated) {
        if (res.jobObj.progressState === 'error') {
          this.dateGenerated = new Date(res.jobObj.lastSuccessfulJob?.dateGenerated) || undefined;
        } else {
          this.dateGenerated = new Date(res.jobObj.dateGenerated);
        }
      }
      if (this.dateGenerated) {
        this.exportMessage = `Last export: ${this.dateGenerated}`;
      } else {
        this.exportMessage = 'No previous report found. Click generate report.';
      }
    } else {
      this.dateGenerated = undefined;
      if (this.currentState !== 0 && this.currentState !== 2) {
        this.exportMessage = 'Exporter running.';
      } else {
        this.exportMessage = 'No previous report found. Click generate report.';
      }
    }
  }

  disableGenerateButton() {
    if (this.activeTab === 'variance' && isNaN(this.modelDate)) {
      return true;
    }
    if (![0, 2, 99].includes(this.currentState)) {
      return true;
    }
    return false;
  } s

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
