import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';
import { ExportService } from '../services/export.service';
import { Constants } from '../shared/utils/constants';
import { DateTime, Duration } from 'luxon';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

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
  public defaultRangeString = 'Select fiscal year';
  public fiscalYearRangeString = this.defaultRangeString;
  public modelDate = NaN;
  public activeTab = '';

  public tz = Constants.timezone;
  public maxDate = DateTime.now().setZone(this.tz);
  // negate duration so we can pick the end date first
  public duration = Duration.fromObject({ years: 1 }).negate();
  public dateFormat = 'yyyy-LL';

  public form = new UntypedFormGroup({
    year: new UntypedFormControl(null),
  });

  public exportMessage = 'Last export: -';

  public initialLoad = true;

  constructor(
    private exportService: ExportService,
    private dataService: DataService,
    private cd: ChangeDetectorRef,
  ) {
    this.subscriptions.add(
      this.dataService
        .watchItem(Constants.dataIds.EXPORT_VARIANCE_POLLING_DATA)
        .subscribe((res) => {
          this.jobUpdate(res);
        }),
    );
    this.subscriptions.add(
      this.form.controls['year'].valueChanges.subscribe((changes) => {
        const startDate = DateTime.fromFormat(changes[1], this.dateFormat).plus(
          { months: 2 },
        );
        const endDate = DateTime.fromFormat(changes[0], this.dateFormat).plus({
          months: 3,
        });
        this.form.controls['year'].setValue(
          [
            startDate.toFormat(this.dateFormat),
            endDate.toFormat(this.dateFormat),
          ],
          {
            emitEvent: false,
          },
        );
      }),
    );
    this.subscriptions.add(
      this.dataService
        .watchItem(Constants.dataIds.EXPORT_ALL_POLLING_DATA)
        .subscribe((res) => {
          this.jobUpdate(res);
        }),
    );
  }

  setMaxDate() {
    // get current fiscal year
    const currentDT = DateTime.now();
    let year = currentDT.year;
    if (currentDT.month > 3) {
      year += 1;
    }
    this.maxDate = DateTime.local(year);
  }

  jobUpdate(res) {
    if (res) {
      this.initialLoad = false;
      if (res?.error) {
        if (res?.error?.state === 'retrying') {
          this.setState(this.stateDictionary.RETRYING);
        } else {
          this.setState(this.stateDictionary.ERROR);
          this.setExportMessage(res);
        }
        this.status = res.error.msg;
      } else {
        if (this.currentState !== 0) {
          if (res?.jobObj?.progressState === 'complete') {
            this.setState(this.stateDictionary.READY_TO_DOWNLOAD);
          } else {
            this.setState(this.stateDictionary.GENERATING);
          }
          this.percentageComplete = res?.jobObj?.progressPercentage;
          this.status = res?.jobObj?.progressDescription;
        }
        this.setExportMessage(res);
      }

      this.signedURL = res?.['signedURL'] ? res?.['signedURL'] : undefined;
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
      const year = this.form.controls['year'].value[1].slice(0, 4);
      this.exportService.generateReport(
        Constants.dataIds.EXPORT_VARIANCE_POLLING_DATA,
        'variance',
        { fiscalYearEnd: year },
      );
    } else {
      this.exportService.generateReport(
        Constants.dataIds.EXPORT_ALL_POLLING_DATA,
        'standard',
      );
    }
    this.cd.detectChanges();
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
        this.exportService.checkForReports(
          Constants.dataIds.EXPORT_VARIANCE_POLLING_DATA,
          'variance',
          { fiscalYearEnd: this.modelDate },
        );
      }
      return;
    } else {
      this.exportService.checkForReports(
        Constants.dataIds.EXPORT_ALL_POLLING_DATA,
        'standard',
      );
    }
    this.cd.detectChanges();
    return;
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
          this.dateGenerated =
            new Date(res.jobObj.lastSuccessfulJob?.dateGenerated) || undefined;
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
    if (this.activeTab === 'variance' && !this.form?.controls?.['year'].value) {
      return true;
    }
    if (![0, 2, 99].includes(this.currentState)) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.setMaxDate();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
