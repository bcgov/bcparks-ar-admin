import { Component, OnDestroy, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SubAreaService } from 'src/app/services/sub-area.service';
import { TypeaheadComponent } from 'src/app/shared/components/typeahead/typeahead.component';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-sub-area-search',
  templateUrl: './sub-area-search.component.html',
  styleUrls: ['./sub-area-search.component.scss'],
})
export class SubAreaSearchComponent implements OnDestroy {
  @ViewChild(TypeaheadComponent) typeAhead: TypeaheadComponent;

  private alive = true;
  private subscriptions: any[] = [];

  public parks = { typeAheadData: [] as any[] };
  public subAreas = { selectData: [] as any[] };
  public typeAheadDisabled = true;
  public subAreaDisabled = true;
  public continueDisabled = true;

  public selectedPark;
  public selectedSubArea;

  public modelDate = '';

  constructor(
    protected dataService: DataService,
    protected subAreaService: SubAreaService
    ) {
    this.subscriptions.push(
      dataService
        .getItemValue(Constants.dataIds.ENTER_DATA_PARK)
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          if (res && res.typeAheadData.length > 0) {
            this.parks = res;
          }
        })
    );
  }

  datePickerOutput(event) {
    this.typeAheadDisabled = false;
    this.typeAhead.reset();

    this.subAreaDisabled = true;
    this.subAreas.selectData = [];

    this.continueDisabled = true;
  }

  parkTypeaheadOutput(event) {
    this.selectedPark = this.parks[event];
    this.subAreas.selectData = [];
    for (let i = 0; i < this.selectedPark.subAreas.length; i++) {
      this.subAreas.selectData.push({
        id: this.selectedPark.subAreas[i],
        label: this.selectedPark.subAreas[i],
      });
    }
    this.subAreaDisabled = false;
    this.continueDisabled = true;
  }

  subAreaOutput(event) {
    this.selectedSubArea = event;
    this.continueDisabled = false;
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
      this.selectedSubArea
    );
  }

  ngOnDestroy() {
    this.alive = false;
    for (let i = 0; i < this.subscriptions.length; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
