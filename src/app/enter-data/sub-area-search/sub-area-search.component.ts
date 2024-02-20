import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription, first } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { Constants } from 'src/app/shared/utils/constants';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DateTime } from 'luxon';
import { UrlService } from 'src/app/services/url.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-sub-area-search',
  templateUrl: './sub-area-search.component.html',
  styleUrls: ['./sub-area-search.component.scss'],
})
export class SubAreaSearchComponent implements OnDestroy {
  @ViewChild('historicalPill') legacyTypeAheadTemplate: TemplateRef<any>;

  private subscriptions = new Subscription();

  public _parks = new BehaviorSubject(null);
  public _subAreas = new BehaviorSubject(null);
  public tz = Constants.timezone;
  public maxDate = DateTime.now().setZone(this.tz);
  public loading: boolean = false;
  public isPageLoaded: boolean = false;

  public form = new UntypedFormGroup({
    date: new UntypedFormControl(null),
    park: new UntypedFormControl(null),
    subArea: new UntypedFormControl(null),
  });

  constructor(
    protected dataService: DataService,
    protected subAreaService: SubAreaService,
    private loadingService: LoadingService,
    private urlService: UrlService,
  ) {
    // Watch the list of parks the user has access to
    this.subscriptions.add(
      dataService
        .watchItem(Constants.dataIds.ENTER_DATA_PARK)
        .subscribe((res) => {
          if (res && res.length) {
            this._parks.next(this.createTypeaheadObj(res, 'parkName'));
          }
        })
    );
    // Watch loading status
    this.subscriptions.add(
      this.loadingService.getLoadingStatus().subscribe((res) => {
        this.loading = res;
      })
    );
    // Watch changes to the park field so we can populate the subarea field
    this.subscriptions.add(
      this.form.controls['park'].valueChanges.subscribe((res) => {
        this.form?.controls?.['subArea']?.reset();
        if (res) {
          this.parkChange(res);
        }
      })
    );
    // Update the url to match the form when it changes
    this.subscriptions.add(
      this.form.valueChanges.subscribe((res) => {
        if (this.isPageLoaded && res) {
          this.updateUrl();
          this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_SUB_AREA, null);
          this.dataService.setItemValue(Constants.dataIds.ACCORDION_ALL_AVAILABLE_RECORDS_LIST, null);
          for (const activity of Constants.ActivityTypes) {
            this.dataService.setItemValue(`accordion-${activity}`, null);
          }
        }
      })
    );
    // set the date
    this.setDate();
    const keys = this.urlService.getQueryParams();
    // Wait for parks to load
    this.subscriptions.add(
      this._parks.pipe(first((res) => res?.length > 0)).subscribe(() => {
        if (keys.orcs) {
          // If park provided in url
          this.subscriptions.add(
            // Wait for subareas to load
            this._subAreas.pipe(first((res) => res?.length)).subscribe(() => {
              if (keys.subAreaId) {
                // If subarea provided in url
                // set subarea
                setTimeout(() => {
                  this.form.controls['subArea'].setValue(this.getLocalStorageSubAreaById(keys.subAreaId));
                }, 0);
                // Autosearch
                this.isPageLoaded = true;
                this.search();
              } else {
                this.isPageLoaded = true;
              }
            })
          );
          // set park
          setTimeout(() => {
            this.form.controls['park'].setValue(this.getLocalStorageParkById(keys.orcs));
          }, 0);
        } else {
          this.isPageLoaded = true;
        }
      })
    );

  }

  // Update the url from the form values
  updateUrl() {
    let value = this.form?.value;
    let params = {};
    if (value?.date) {
      params['date'] = value.date;
    }
    if (value?.park?.parkName) {
      params['parkName'] = value.park.parkName;
    }
    if (value?.park?.orcs) {
      params['orcs'] = value.park.orcs;
    }
    if (value?.subArea?.name) {
      params['subAreaName'] = value.subArea.name;
    }
    if (value?.subArea?.id) {
      params['subAreaId'] = value.subArea.id;
    }
    this.urlService.setQueryParams(params);
  }

  getValue(field) {

    if (!this.form.controls[field]?.value) {
      return true;
    }
    return false;
  }

  setDate() {
    let params = this.urlService.getQueryParams();
    const format = 'yyyyLL';
    let setDate = DateTime.fromFormat(params?.date || '', format);
    if (setDate > this.maxDate || setDate.invalid) {
      setDate = this.maxDate;
    }
    this.form.controls['date'].setValue(setDate.toFormat(format) || null);
  }

  // Get park object by orcs
  getLocalStorageParkById(orcs) {
    let park = this._parks?.value?.find((p) => p?.value?.orcs === orcs);
    return park?.value || null;
  }

  // Get subarea object by subarea id
  getLocalStorageSubAreaById(id) {
    let subarea = this._subAreas?.value.find((s) => s?.value?.id === id);
    return subarea?.value || null;
  }

  // create typeahead object
  createTypeaheadObj(items, display) {
    let list = [];
    for (const item of items) {
      list.push({
        value: item,
        display: item[display]
      });
    }
    return list;
  }

  // Build subarea list. Fired when park changes
  parkChange(parkSelection) {
    this._subAreas.next(this.createTypeaheadObj(parkSelection.subAreas, 'name'));
  }

  // Custom typeahead formatter so that we can put 'historical' badges on subareas.
  getHighlightedMatch(item, query) {
    query = query.join(' ');
    let display = item.value;
    if (display.toLocaleLowerCase().indexOf(query) > -1) {
      const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
      const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length);
      const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
      return [
        '<span>' + left_str + '</span>',
        '<span>' + highlight_str + '</span>',
        '<span>' + right_str + '</span>',
      ];
    }
    else
      return [
        '<span>' + display + '</span>',
        '',
        '',
      ];
  }

  // Perform search
  search() {
    this.updateUrl();
    const params = this.urlService.getQueryParams();
    this.dataService.setItemValue(Constants.dataIds.ENTER_DATA_URL_PARAMS, {
      parkName: params?.parkName || '',
      subAreaName: params?.subAreaName || '',
      date: params?.date || '',
      orcs: params?.orcs || '',
      subAreaId: params?.subAreaId || '',
      isLegacy: this.form.controls?.['subarea']?.value?.value?.isLegacy || false,
    });
    this.subAreaService.fetchSubArea(
      Constants.dataIds.ENTER_DATA_SUB_AREA,
      params?.orcs,
      params?.subAreaId,
      params?.date,
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
