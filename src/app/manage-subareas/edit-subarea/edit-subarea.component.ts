import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ParkService } from 'src/app/services/park.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
    selector: 'app-edit-subarea',
    templateUrl: './edit-subarea.component.html',
    styleUrls: ['./edit-subarea.component.scss'],
    standalone: false
})
export class EditSubareaComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  public _parks = new BehaviorSubject(null);
  public _subareas = new BehaviorSubject(null);
  public _selectedSubarea = new BehaviorSubject(null);

  public form = new UntypedFormGroup({
    parkName: new UntypedFormControl(null, [Validators.required]),
    subAreaName: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(
    private dataService: DataService,
    private parkService: ParkService,
    private subareaService: SubAreaService,
  ) {
    // watch for changes in park
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.ENTER_DATA_PARK).subscribe((res) => {
        if (res) {
          this._parks.next(res.map((park) => {
            return {
              value: park,
              display: park.parkName
            };
          }));
        } else {
          this._parks.next(null);
          this.form.controls['parkName'].setValue(null);
        }
      })
    );
    // watch for changes in subareas
    this.subscriptions.add(
      this.dataService.watchItem(Constants.dataIds.CURRENT_SUBAREA_LIST).subscribe((res) => {
        if (res) {
          this._subareas.next(res.map((subarea) => {
            return {
              value: subarea,
              display: subarea.subAreaName
            };
          }));
        } else {
          this._subareas.next(null);
          this.form.controls['subAreaName'].setValue(null);
        }
      })
    );
    // When selected park changes, get the subareas for that park
    this.subscriptions.add(
      this.form.controls['parkName'].valueChanges.subscribe((res) => {
        if (res && res?.orcs) {
          this.getSubareas(res.orcs);
        } else {
          this._subareas.next(null);
          this.form.controls['subAreaName'].setValue(null);
        }
      })
    );
    // when selected subarea changes, forward the information to prepopulate the form
    this.subscriptions.add(
      this.form.controls['subAreaName'].valueChanges.subscribe((res) => {
        if (res) {
          this._selectedSubarea.next(res);
        } else {
          this._selectedSubarea.next(null);
        }
      })
    );
  }

  ngOnInit() {
    this.getParks();
  }

  getParks() {
    this.parkService.fetchEnterDataPark();
  }

  getSubareas(orcs) {
    this.subareaService.fetchSubareasByOrcs(orcs);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}