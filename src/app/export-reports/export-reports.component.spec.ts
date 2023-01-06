import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs/internal/observable/of';
import { ConfigService } from '../services/config.service';
import { DataService } from '../services/data.service';

import { ExportReportsComponent } from './export-reports.component';

describe('ExportReportsComponent', () => {
  let component: ExportReportsComponent;
  let fixture: ComponentFixture<ExportReportsComponent>;

  const mockDataService = {
    getItemValue: (item) => {
      return of({
        jobObj: {
          id: '123',
          progressState: 'running'
        }
      })
    },
    setItemValue: () => {
      return of({})
    }
  }

  beforeEach(async () => {let dataService;
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [ExportReportsComponent],
      providers: [
        HttpClient,
        HttpHandler,
        ConfigService,
        {
          provide: DataService, useValue: mockDataService
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportReportsComponent);
    component = fixture.componentInstance;
  });

  it('should create and setup the component', async () => {
    expect(component).toBeTruthy();
    expect(component.status).toEqual('Standing by');

    await fixture.detectChanges();
    await component.generateReport();

    expect(component.status).toEqual('Requesting job');
  });

  it('should download the report', async () => {
    let spy = spyOn(window, 'open');

    expect(component).toBeTruthy();

    component.signedURL = '/some-location';
    component.downloadReport();
    expect(spy).toHaveBeenCalledWith(component.signedURL, '_blank');
  });

  it('should set the export message and date generated', async () => {
    expect(component).toBeTruthy();

    component.setExportMessage({
      jobObj: {
        progressState: 'error',
        dateGenerated: '2012-01-01',
        lastSuccessfulJob: {
          dateGenerated: '2012-01-01'
        }
      }
    });
    fixture.detectChanges();
    expect(component.dateGenerated).toBeTruthy();

    component.setExportMessage({
      jobObj: {
        progressState: 'complete',
        dateGenerated: '2012-01-01'
      }
    });
    fixture.detectChanges();
    expect(component.dateGenerated).toBeTruthy();
  });

  it('should set the state accordingly', async () => {
    expect(component).toBeTruthy();

    component.setState(0);
    expect(component.animated).toBe(true);
    expect(component.status).toEqual('Standing by');
    expect(component.percentageComplete).toEqual(0);
    expect(component.progressBarTextOverride).toEqual(undefined);
    expect(component.disableGenerate).toEqual(false);
    expect(component.disableDownload).toEqual(true);
    expect(component.currentState).toEqual(0);
    expect(component.progressBarColour).toEqual('secondary');

    component.setState(1);
    expect(component.animated).toBe(true);
    expect(component.status).toEqual('Requesting job');
    expect(component.percentageComplete).toEqual(0);
    expect(component.progressBarTextOverride).toEqual(undefined);
    expect(component.disableGenerate).toEqual(true);
    expect(component.disableDownload).toEqual(true);
    expect(component.currentState).toEqual(1);
    expect(component.progressBarColour).toEqual('warning');

    component.setState(2);
    expect(component.animated).toBe(false);
    expect(component.progressBarTextOverride).toEqual(undefined);
    expect(component.disableGenerate).toEqual(false);
    expect(component.disableDownload).toEqual(false);
    expect(component.currentState).toEqual(2);
    expect(component.progressBarColour).toEqual('success');

    component.setState(98);
    expect(component.animated).toBe(true);
    expect(component.status).toEqual('Error, retrying.');
    expect(component.percentageComplete).toEqual(100);
    expect(component.progressBarTextOverride).toEqual('RETRYING');
    expect(component.disableGenerate).toEqual(true);
    expect(component.disableDownload).toEqual(true);
    expect(component.currentState).toEqual(3);
    expect(component.progressBarColour).toEqual('secondary');

    component.setState(99);
    expect(component.animated).toBe(false);
    expect(component.status).toEqual('Error, please try again.');
    expect(component.percentageComplete).toEqual(100);
    expect(component.progressBarTextOverride).toEqual('ERROR');
    expect(component.disableGenerate).toEqual(false);
    expect(component.disableDownload).toEqual(false);
    expect(component.currentState).toEqual(3);
    expect(component.progressBarColour).toEqual('danger');
    component.setState('nonsense');
    // NB: Fall through and don't change anything.
    expect(component.animated).toBe(false);
    expect(component.status).toEqual('Error, please try again.');
    expect(component.percentageComplete).toEqual(100);
    expect(component.progressBarTextOverride).toEqual('ERROR');
    expect(component.disableGenerate).toEqual(false);
    expect(component.disableDownload).toEqual(false);
    expect(component.currentState).toEqual(3);
    expect(component.progressBarColour).toEqual('danger');
  });
});
