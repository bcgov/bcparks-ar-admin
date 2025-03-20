import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
    selector: 'app-subarea-form',
    templateUrl: './subarea-form.component.html',
    styleUrls: ['./subarea-form.component.scss'],
    standalone: false
})
export class SubareaFormComponent implements OnInit, OnDestroy {

  @Input() editMode: boolean = false;
  @Input() set subareaData(value) {
    if (value) {
      this.matchDataToOptions(value);
    }
  }

  public subscriptions = new Subscription();

  public showReviewModal: boolean = false;

  public activities = [
    "Backcountry Cabins",
    "Backcountry Camping",
    "Boating",
    "Day Use",
    "Frontcountry Cabins",
    "Frontcountry Camping",
    "Group Camping"
  ];

  public form = new UntypedFormGroup({
    orcs: new UntypedFormControl(null, [Validators.required]),
    parkName: new UntypedFormControl(null, [Validators.required]),
    subAreaName: new UntypedFormControl(null, [Validators.required]),
    region: new UntypedFormControl(null, [Validators.required]),
    section: new UntypedFormControl(null, [Validators.required]),
    managementArea: new UntypedFormControl(null, [Validators.required]),
    bundle: new UntypedFormControl(null, [Validators.required]),
    activities: new UntypedFormControl(null, [this.selectAtLeastOneValidator()]),
  });

  public _parks = new BehaviorSubject(null);
  public _parkNames = new BehaviorSubject(null);
  public _currentPark = new BehaviorSubject(null);
  public _regions = new BehaviorSubject(null);
  public _sections = new BehaviorSubject(null);
  public _managementAreas = new BehaviorSubject(null);
  public _currentRegion = new BehaviorSubject(null);
  public _bundles = new BehaviorSubject(null);

  public submitted = false;
  public newData = [];
  public oldData = [];
  public submissionData: any = {};
  public parkUpdatingFlag = false;

  constructor(
    private dataService: DataService,
    private subareaService: SubAreaService,
    private loadingService: LoadingService
  ) {
    // Get the current list of orcs
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.ENTER_DATA_PARK).subscribe((res) => {
        if (res) {
          // build parks array
          let parks = [];
          let parkNames = [];
          for (const park of res) {
            parks.push({
              value: park,
              display: park.orcs
            });
            parkNames.push({
              value: park,
              display: park.parkName
            });
          }
          this._parks.next(parks);
          this._parkNames.next(parkNames);
        }
      })
    );
    // On orcs change, set the park name
    this.subscriptions.add(
      this.form.controls['orcs'].valueChanges.subscribe((value) => {
        this._currentPark.next(value);
        if (!this.parkUpdatingFlag) {
          this.parkUpdatingFlag = true;
          this.form.controls['parkName'].setValue(value);
        }
        this.parkUpdatingFlag = false;
      })
    );
    // On park name change, set the orcs
    this.subscriptions.add(
      this.form.controls['parkName'].valueChanges.subscribe((value) => {
        this._currentPark.next(value);
        if (!this.parkUpdatingFlag) {
          this.parkUpdatingFlag = true;
          this.form.controls['orcs'].setValue(value);
        }
        this.parkUpdatingFlag = false;
      }
      ));


    // Watch for regions
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.REGION_LIST).subscribe((res) => {
        if (res) {
          this._regions.next(res.map(region => {
            return {
              value: region,
              display: region?.displayName
            };
          }));
        }
      })
    );

    // Watch for specific region
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.CURRENT_REGION).subscribe((res) => {
        if (res) {
          this._sections.next(res?.sections?.map(section => {
            return {
              value: section,
              display: section?.displayName
            };
          }));
        }
      })
    );

    // Watch for bundles
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.BUNDLE_LIST).subscribe((res) => {
        if (res) {
          this._bundles.next(res?.map(bundle => {
            return {
              value: bundle,
              display: bundle?.displayName
            };
          }
          ));
        }
      })
    );

    // On Region change, build sections list
    this.subscriptions.add(
      this.form.controls['region'].valueChanges.subscribe((region) => {
        if (region) {
          if (region === this._currentRegion?.value) {
            return;
          }
          this._currentRegion.next(region);
          this.getRegions(region?.sk);
        } else {
          this._currentRegion.next(null);
          this._sections.next(null);
          this.form.controls['section'].setValue(null);
        }
      })
    );

    // On section change, set the management area
    this.subscriptions.add(
      this.form.controls['section'].valueChanges.subscribe((section) => {
        if (section) {
          this._managementAreas.next(section?.managementAreas?.map(managementArea => {
            return {
              value: managementArea,
              display: managementArea?.displayName
            };
          })
          );
        } else {
          this._managementAreas.next(null);
          this.form.controls['managementArea'].setValue(null);
        }
      })
    );
  }

  ngOnInit() {
    this.getRegions();
    this.getBundles();
  }

  setParkName() {
    const currentPark = this.form.controls['orcs'].value;
    if (currentPark?.parkName) {
      this.form.controls['parkName'].setValue(currentPark.parkName, { emitEvent: false });
    }
  }

  setParkOrcs() {
    const currentPark = this.form.controls['parkName'].value;
    if (currentPark?.orcs) {
      this.form.controls['orcs'].setValue(currentPark.orcs, { emitEvent: false });
    }
  }

  getRegions(regionId = null) {
    this.subareaService.fetchRegions(regionId);
  }

  getBundles() {
    this.subareaService.fetchBundles();
  }

  buildSectionsList() {
    this._sections.next(this._currentRegion?.value?.sections || null);
  }

  onCancel() {
    this.form.reset();
  }

  disableSubmit() {
    if (this.form.invalid) {
      return true;
    } else if (this.editMode && this.form.pristine) {
      return true;
    }
    return false;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.submitted = true;
    if (this.form.valid) {
      // parse subarea values
      this.submissionData = {
        orcs: this.form.controls['orcs'].value?.orcs,
        subAreaName: this.form.controls['subAreaName'].value,
        region: this.form.controls['region'].value?.displayName,
        section: this.form.controls['section'].value?.displayName,
        managementArea: this.form.controls['managementArea'].value?.displayName,
        bundle: this.form.controls['bundle'].value?.displayName,
        activities: this.form.controls['activities'].value
      };
      // get dirty fields
      let dirtyFields: any = {};
      for (const control in this.form.controls) {
        if (this.form.controls[control].dirty) {
          dirtyFields[control] = this.form.controls[control].value;
        }
      }
      // build new data
      this.newData = [
        {
          label: 'ORCS',
          value: dirtyFields?.orcs?.orcs
        },
        {
          label: 'Park Name',
          value: dirtyFields?.orcs?.parkName
        },
        {
          label: 'Subarea Name',
          value: dirtyFields?.subAreaName
        },
        {
          label: 'Region',
          value: dirtyFields?.region?.displayName
        },
        {
          label: 'Section',
          value: dirtyFields?.section?.displayName
        },
        {
          label: 'Management Area',
          value: dirtyFields?.managementArea?.displayName
        },
        {
          label: 'Bundle',
          value: dirtyFields?.bundle?.displayName
        },
        {
          label: 'Activities',
          value: dirtyFields?.activities?.join(', ')
        }
      ];
      this.showModal();
    }
  }

  async onModalSubmit() {
    let res = await this.subareaService.createSubarea(this.submissionData);
    if (res) {
      this.form.reset();
      this.submitted = false;
      this.hideModal();
    }
  }

  buildModalBody(data) {
    let body = [];
    if (data?.orcs) {
      body.push({
        label: 'ORCS',
        value: data?.orcs
      });
    }

  }

  selectAtLeastOneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || control.value.length === 0) {
        return { 'selectAtLeastOne': 'At least one activity must be selected' };
      }
      return null;
    };
  }

  matchDataToOptions(data) {
    // Since region, section, management area and bundle are objects, we need to match the incoming subareas data (strings) to the options...
    // wait for orcs
    this._parks.subscribe((parks) => {
      if (parks?.length > 0) {
        // get matching park
        const park = parks.find(park => park?.value?.orcs === data.orcs);
        this.form.controls['orcs'].setValue(park.value);
      }
    }
    );
    this.form.controls['subAreaName'].setValue(data.subAreaName);
    this.form.controls['activities'].setValue(data.activities);

    // match bundle
    this._bundles.subscribe((bundles) => {
      if (bundles?.length > 0) {
        this.form.controls['bundle'].setValue(this.matchDataString(data.bundle, this._bundles));
      }
    });

    // Match region
    this.form.controls['region'].setValue(this.matchDataString(data.region, this._regions));
    let regionSub = this._regions.subscribe((regions) => {
      if (regions?.length > 0) {
        let currentRegionSub = this._currentRegion.subscribe((currentRegion) => {
          if (currentRegion) {
            this.buildSectionsList();
          }
        });
      }
    });
    // wait for section list to be loaded in
    let sectionSub = this._sections.subscribe((sections) => {
      if (sections?.length > 0) {
        let managementAreaSub = this._managementAreas.subscribe((managementAreas) => {
          if (managementAreas?.length > 0) {
            this.form.controls['managementArea'].setValue(this.matchDataString(data.managementArea, this._managementAreas));
          }
        });
        this.form.controls['section'].setValue(this.matchDataString(data.section, this._sections));
      }
    });
  }

  matchDataString(string, _options: BehaviorSubject<any>) {
    const found = _options.value.find(option => option.display === string);
    if (found) {
      return found.value;
    } else {
      // create new and put it on the list to make this work
      const newOption = {
        value: string,
        display: string
      };
      const newOptions = [..._options.value, newOption];
      _options.next(newOptions);
      return newOption.value;
    }
  }

  showModal() {
    this.showReviewModal = true;
  }

  hideModal() {
    this.showReviewModal = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
