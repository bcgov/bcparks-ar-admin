import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { TypeaheadComponent } from 'src/app/shared/components/typeahead/typeahead.component';
import { Constants } from 'src/app/shared/utils/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/shared/utils/utils';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-sub-area-search',
  templateUrl: './sub-area-search.component.html',
  styleUrls: ['./sub-area-search.component.scss'],
})
export class SubAreaSearchComponent implements OnDestroy {
  @ViewChild(TypeaheadComponent) typeAhead: TypeaheadComponent;

  private subscriptions = new Subscription();
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

  public maxDate = new Date();

  public loading: any = false;

  constructor(
    protected dataService: DataService,
    protected subAreaService: SubAreaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formService: FormService
  ) {
    this.subscriptions.add(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_PARK)
        .subscribe((res) => {
          if (res && res.typeAheadData?.length > 0) {
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
    for (let i = 0; i < this.selectedPark.subAreas?.length; i++) {
      this.subAreas.selectData.push({
        id: this.selectedPark.subAreas[i].id,
        label: this.selectedPark.subAreas[i].name,
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
    // we can get subarea name and id from the park object.
    let subAreaFilter = this.subAreas.selectData.filter(subArea => subArea.id === event);
    this.selectedSubArea = subAreaFilter[0];
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        date: this.utils.convertJSDateToYYYYMM(new Date(this.modelDate)),
        orcs: this.selectedPark.sk,
        parkName: this.selectedPark.parkName,
        subAreaId: this.selectedSubArea.id,
        subAreaName: this.selectedSubArea.label
      },
    });
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  search() {
    this.setFormParams();
    this.subAreaService.fetchSubArea(
      Constants.dataIds.ENTER_DATA_SUB_AREA,
      this.selectedPark.sk,
      this.selectedSubArea.id,
      this.utils.convertJSDateToYYYYMM(new Date(this.modelDate))
    );
  }

  setFormParams() {
    this.formService.setFormParams({
      date: this.utils.convertJSDateToYYYYMM(new Date(this.modelDate)),
      parkName: this.selectedPark.parkName,
      subAreaId: this.selectedSubArea.id,
      subAreaName: this.selectedSubArea.label,
      orcs: this.selectedPark.sk,
    });
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

        this.subAreas.selectData = [];
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
    const subAreaId = params['subAreaId'];

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
    if (date && orcs && subAreaId) {
      state = 'subArea';
      this.modelSubArea = subAreaId;
      this.subAreaOutput(subAreaId);
      this.setFormParams();
    }
    this.dataPreloaded = true;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
