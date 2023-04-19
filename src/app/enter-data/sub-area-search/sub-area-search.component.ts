import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { TypeaheadComponent } from 'src/app/shared/components/typeahead/typeahead.component';
import { Constants } from 'src/app/shared/utils/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/shared/utils/utils';
import { FormService } from 'src/app/services/form.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-area-search',
  templateUrl: './sub-area-search.component.html',
  styleUrls: ['./sub-area-search.component.scss'],
})
export class SubAreaSearchComponent implements OnDestroy, AfterViewInit {
  @ViewChild('parkTypeAhead') parkTypeAhead: TypeaheadComponent;
  @ViewChild('subAreaTypeAhead') subAreaTypeAhead: TypeaheadComponent;
  @ViewChild('historicalPill') legacyTypeAheadTemplate: TemplateRef<any>;

  private subscriptions = new Subscription();
  private utils = new Utils();
  private dataPreloaded = false;
  private previousDateChosen;

  public parks;
  public subAreas;
  public parkDisabled = true;
  public subAreaDisabled = true;
  public continueDisabled = true;

  public selectedPark;
  public selectedSubArea;

  public modelDate;
  public modelPark = null;
  public modelSubArea = null;
  public formDisplayValues = {};

  // The root BaseFormComponent is outdated in A&R and is not generic enough to be used here.
  public form: UntypedFormGroup;
  public fields: any = {};
  public searchParams: any = {};

  public maxDate = new Date();

  public loading: any = false;

  constructor(
    protected dataService: DataService,
    protected subAreaService: SubAreaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
  ) {
    this.subscriptions.add(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_PARK)
        .subscribe((res) => {
          if (res && res.length) {
            this.parks = this.utils.convertArrayIntoObjForTypeAhead(res, 'parkName');
            this.formatLegacyTypeaheadLabel(this.parks);
            if (
              !this.dataPreloaded &&
              Object.keys(activatedRoute.snapshot.queryParams).length !== 0
            ) {
              this.searchParams = activatedRoute.snapshot.queryParams;
            }
            this.setForm();
          }
        })
    );
  }

  ngAfterViewInit() {
    // Sometimes the historical field template has not yet been intialized when the typeahead is rendered.
    if (this.parks) {
      this.formatLegacyTypeaheadLabel(this.parks);
    }
  }

  setForm() {
    let initPark = this.parks?.find((park) => park.value.orcs === this.searchParams.orcs);
    let initSubArea;
    if (initPark?.value?.subAreas) {
      this.subAreas = this.utils.convertArrayIntoObjForTypeAhead(initPark.value.subAreas, 'name');
      this.formatLegacyTypeaheadLabel(this.subAreas);
      initSubArea = this.subAreas?.find((subArea) => subArea.value.id === this.searchParams.subAreaId);
    }
    this.form = new UntypedFormGroup({
      park: new UntypedFormControl(initPark || null),
      subArea: new UntypedFormControl(initSubArea || null),
    });
    for (const key in this.form.controls) {
      this.fields[key] = this.form.controls[key];
      this.subscriptions.add(
        this.fields[key].valueChanges.subscribe((value) => {
          this.onFormChange(key, value);
        }
        ));
    }
    this.presetUI();
    this.setFormParams();
  }

  onFormChange(field, value) {
    switch (field) {
      case 'park':
        this.parkChange(value)
        break;
      case 'subArea':
        this.subAreaChange(value)
        break;
    }
  }

  presetUI() {
    if (this.searchParams?.date) {
      this.setDate(this.searchParams.date);
      if (this.searchParams?.orcs) {
        this.setPark(this.searchParams.orcs);
        if (this.searchParams?.subAreaId) {
          this.setSubArea(this.searchParams.subAreaId);
        }
      }
    }
  }

  formatLegacyTypeaheadLabel(list) {
    for (const item of list) {
      if (item.value.isLegacy) {
        item.template = this.legacyTypeAheadTemplate;
      }
    }
  }

  dateChange(event) {
    this.setDate(this.utils.convertJSDateToYYYYMM(event))
  }

  setDate(YYYYMM) {
    this.modelDate = this.utils.convertYYYYMMToJSDate(YYYYMM);
    if (new Date(this.modelDate) <= this.maxDate) {
      this.previousDateChosen = this.modelDate;
      this.setURL(YYYYMM);
    } else {
      const self = this;
      setTimeout(() => {
        this.modelDate = this.previousDateChosen;
      }, 50);
    }
    this.setFormState('date');
  }

  parkChange(event) {
    if (event) {
      this.setPark(event.value.orcs);
    } else {
      this.setPark(null);
    }
  }

  setPark(orcs) {
    if (orcs) {
      this.selectedPark = this.parks.find((park) => park.value.orcs === orcs);
      this.subAreas = this.utils.convertArrayIntoObjForTypeAhead(this.selectedPark.value.subAreas, 'name');
      this.formatLegacyTypeaheadLabel(this.subAreas);
      this.setURL(this.utils.convertJSDateToYYYYMM(this.modelDate), this.selectedPark.value);
      this.setFormState('park');
    } else {
      this.fields.subArea.setValue(null);
      this.setURL(this.utils.convertJSDateToYYYYMM(this.modelDate));
      this.setFormState('date');
    }
  }

  subAreaChange(event) {
    if (event) {
      this.setSubArea(event.value.id);
    } else {
      this.setSubArea(null);
    }
  }

  setSubArea(subAreaId) {
    if (subAreaId) {
      this.selectedSubArea = this.subAreas.find((subArea) => subArea.value.id === subAreaId);
      this.setURL(this.utils.convertJSDateToYYYYMM(this.modelDate), this.selectedPark.value, this.selectedSubArea.value);
      this.setFormState('subArea');
    } else {
      this.setURL(this.utils.convertJSDateToYYYYMM(this.modelDate), this.selectedPark.value);
      this.setFormState('park');
    }
  }

  setFormState(state) {
    switch (state) {
      case 'none':
        this.parkDisabled = true;
        this.subAreaDisabled = true;
        this.continueDisabled = true;
        break;
      case 'date':
        this.parkDisabled = false;
        this.subAreaDisabled = true;
        this.continueDisabled = true;
        break;
      case 'park':
        this.parkDisabled = false;
        this.subAreaDisabled = false;
        this.continueDisabled = true;
        break;
      case 'subArea':
        this.parkDisabled = false;
        this.subAreaDisabled = false;
        this.continueDisabled = false;
        break;
    }
  }

  setURL(date, parkValue?, subAreaValue?) {
    let queryParams = {
      date: date
    }
    if (parkValue) {
      queryParams['orcs'] = parkValue.orcs;
      queryParams['parkName'] = parkValue.parkName;
    }
    if (subAreaValue) {
      queryParams['subAreaId'] = subAreaValue.id;
      queryParams['subAreaName'] = subAreaValue.name
    }
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams
    });
  }

  search() {
    this.setFormParams();
    this.subAreaService.fetchSubArea(
      Constants.dataIds.ENTER_DATA_SUB_AREA,
      this.fields.park.value?.value?.orcs,
      this.fields.subArea.value?.value?.id,
      this.utils.convertJSDateToYYYYMM(new Date(this.modelDate))
    );
  }

  setFormParams() {
    this.formService.setFormParams({
      date: this.utils.convertJSDateToYYYYMM(new Date(this.modelDate)),
      parkName: this.fields.park.value?.value?.parkName,
      subAreaId: this.fields.subArea.value?.value?.id,
      subAreaName: this.fields.subArea.value?.value?.name,
      orcs: this.fields.park.value?.value?.orcs,
      isLegacy: this.fields.subArea.value?.value?.isLegacy
    });
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
