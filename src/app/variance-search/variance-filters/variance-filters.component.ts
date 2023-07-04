import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Utils } from 'src/app/shared/utils/utils';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Constants } from 'src/app/shared/utils/constants';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { VarianceService } from 'src/app/services/variance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-variance-filters',
  templateUrl: './variance-filters.component.html',
  styleUrls: ['./variance-filters.component.scss']
})
export class VarianceFiltersComponent implements OnInit, OnDestroy {
  public form;
  public fields: any = {};
  public subscriptions = new Subscription();

  private utils = new Utils();

  public urlParams;
  public modelDate;
  public maxDate = new Date();
  public previousDateChosen;
  public lastEvaluatedKey = null;
  public parks: any[] = [];;
  public subAreas: any[] = [];;
  public activityOptions: any[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dataService: DataService,
    private subareaService: SubAreaService,
    private varianceService: VarianceService,
    private cd: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.ENTER_DATA_PARK).subscribe((res) => {
        if (res) {
          this.parks = this.utils.convertArrayIntoObjForTypeAhead(res, 'parkName');
        }
      })
    )
    
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.CURRENT_SUBAREA_LIST).subscribe((res) => {
        if (res) {
          this.buildSubareaOptions(res);
        }
      })
    );
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.VARIANCE_LIST).subscribe((res) => {
        if (res && res.lastEvaluatedKey) {
          this.lastEvaluatedKey = res.lastEvaluatedKey;
        } else {
          this.lastEvaluatedKey = null;
        }
      })
    );
  }

  ngOnInit() {
    
    // build form
    this.form = this.formBuilder.group({});

    // build controls
    this.buildFormControls();

    // build fields object
    for (const control in this.form.controls) {
      this.fields[control] = this.form.controls[control];
    }

    // watch for park change to populate subarea field
    this.fields.park.valueChanges.subscribe((park) => {
      if (park) {
        this.subareaService.fetchSubareasByOrcs(park.value.orcs);
      }
    })

    // watch for subarea change to populate the subarea field
    this.fields.subarea.valueChanges.subscribe((subarea) => {
      if (subarea) {
        this.buildActivityOptions(subarea);
      }
    })

    this.cd.detectChanges();
  }

  buildFormControls() {
    let controls = [
      {
        key: 'date',
        default: null
      },
      {
        key: 'activity',
        validators: [
          Validators.required
        ]
      },
      {
        key: 'park',
        default: null,
        validators: [
          Validators.required
        ]
      },
      {
        key: 'subarea',
        default: null,
        validators: [
          Validators.required
        ]
      }
    ];
    for (const control of controls) {
      this.form.addControl(control.key, new UntypedFormControl(control?.default || null));
      if (control.validators) {
        this.form.controls[control.key].setValidators(control.validators);
      }
    }
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  dateChange(event) {
    this.setDate(this.utils.convertJSDateToYYYYMM(event))
  }

  setDate(YYYYMM) {
    this.modelDate = this.utils.convertYYYYMMToJSDate(YYYYMM);
    if (new Date(this.modelDate) <= this.maxDate) {
      this.previousDateChosen = this.modelDate;
      this.form.controls.date.setValue(YYYYMM);
    } else {
      setTimeout(() => {
        this.modelDate = this.previousDateChosen;
      }, 50);
    }
  }

  buildSubareaOptions(subareas) {
    this.subAreas = [];
    for (const subarea of subareas) {
      this.subAreas.push({
        key: subarea.sk,
        value: subarea,
        display: subarea.subAreaName
      })
    }
    this.cd.detectChanges();
  }


  buildActivityOptions(subarea) {
    this.activityOptions = [];
    for (const activity of subarea.value?.activities) {
      let activityKey = activity.replace(/ /g, '');
      this.activityOptions.push({
        key: activityKey.toLowerCase(),
        value: activity,
        display: activity
      })
    }
    this.cd.detectChanges();
  }

  parkCleared() {
    this.fields?.subarea?.setValue(null);
    this.fields?.activity?.setValue(null);
  }

  submit() {
    // collect form values
    let queryParams = this.collect();
    // You currently need date, activity, and subareaid to do a variance search.
    queryParams.subAreaId = queryParams.subarea?.sk;
    this.varianceService.fetchVariance(queryParams);
  }

  collect() {
    // collect form values
    let formValues = this.form.value;
    return {
      ...formValues,
      park: formValues.park?.value,
      subarea: formValues.subarea?.value,
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
