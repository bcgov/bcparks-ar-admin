import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { TypeaheadComponent } from 'src/app/shared/components/typeahead/typeahead.component';
import { Constants } from 'src/app/shared/utils/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-sub-area-search',
  templateUrl: './sub-area-search.component.html',
  styleUrls: ['./sub-area-search.component.scss'],
})
export class SubAreaSearchComponent implements OnDestroy {
  @ViewChild(TypeaheadComponent) typeAhead: TypeaheadComponent;

  private alive = true;
  private subscriptions: any[] = [];
  private utils = new Utils();
  private dataPreloaded = false;

  public parks = { typeAheadData: [] as any[] };
  public subAreas = { selectData: [] as any[] };
  public typeAheadDisabled = true;
  public subAreaDisabled = true;
  public continueDisabled = true;

  public selectedPark;
  public selectedSubArea;

  public modelDate = '';
  public modelPark = '';
  public modelSubArea = null;

  constructor(
    protected dataService: DataService,
    protected subAreaService: SubAreaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_PARK)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res && res.typeAheadData.length > 0) {
            this.parks = res;
            if (
              !this.dataPreloaded &&
              Object.keys(activatedRoute.snapshot.queryParams).length !== 0
            ) {
              this.presetUI(activatedRoute.snapshot.queryParams);
            }
          }
        })
    );
  }

  datePickerOutput(event) {
    this.setButtonState('date');

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        date: this.utils.convertJSDateToYYYYMM(new Date(this.modelDate)),
      },
    });
  }

  parkTypeaheadOutput(event) {
    this.setButtonState('park');
    this.selectedPark = this.parks[event];
    for (let i = 0; i < this.selectedPark.subAreas.length; i++) {
      this.subAreas.selectData.push({
        id: this.selectedPark.subAreas[i],
        label: this.selectedPark.subAreas[i],
      });
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        date: this.utils.convertJSDateToYYYYMM(new Date(this.modelDate)),
        orcs: this.selectedPark.sk,
        parkName: this.selectedPark.parkName,
      },
    });
  }

  subAreaOutput(event) {
    this.setButtonState('subArea');
    this.selectedSubArea = event;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        date: this.utils.convertJSDateToYYYYMM(new Date(this.modelDate)),
        orcs: this.selectedPark.sk,
        parkName: this.selectedPark.parkName,
        subArea: this.selectedSubArea,
      },
      queryParamsHandling: 'merge',
    });
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  search() {
    this.subAreaService.fetchSubArea(
      Constants.dataIds.ENTER_DATA_SUB_AREA,
      this.selectedPark.sk,
      this.selectedSubArea,
      this.utils.convertJSDateToYYYYMM(new Date(this.modelDate))
    );
  }

  setButtonState(state) {
    switch (state) {
      case 'none':
        this.typeAheadDisabled = true;
        this.subAreaDisabled = true;
        this.continueDisabled = true;

        this.subAreas.selectData = [];
        break;
      case 'date':
        this.typeAheadDisabled = false;
        this.subAreaDisabled = true;
        this.continueDisabled = true;

        this.typeAhead?.reset();
        this.subAreas.selectData = [];
        break;
      case 'park':
        this.typeAheadDisabled = false;
        this.subAreaDisabled = false;
        this.continueDisabled = true;
        break;
      case 'subArea':
        this.typeAheadDisabled = false;
        this.subAreaDisabled = false;
        this.continueDisabled = false;
        break;
      default:
        break;
    }
  }

  presetUI(params) {
    let date = params['date'];
    const orcs = params['orcs'];
    const parkName = params['parkName'];
    const subArea = params['subArea'];

    if (date) {
      date = this.utils.convertYYYYMMToJSDate(date);
    }

    let state = 'none';
    if (date) {
      state = 'date';
      this.modelDate = date;
      this.datePickerOutput(null);
    }
    if (date && orcs) {
      state = 'park';
      this.modelPark = parkName;
      this.parkTypeaheadOutput(parkName);
    }
    if (date && orcs && subArea) {
      state = 'subArea';
      this.modelSubArea = subArea;
      this.subAreaOutput(subArea);
    }
    this.setButtonState(state);
    this.dataPreloaded = true;
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
