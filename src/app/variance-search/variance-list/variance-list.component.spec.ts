import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceListComponent } from './variance-list.component';
import { MockData } from 'src/app/shared/utils/mock.data';

describe('VarianceListComponent', () => {
  let component: VarianceListComponent;
  let fixture: ComponentFixture<VarianceListComponent>;

  let mockVarianceRecords = [MockData.mockVarianceRecord_1, MockData.mockVarianceRecord_2];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VarianceListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VarianceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeTruthy();
    expect(component.rowSchema.length).toEqual(5);
  });

  it('should create variance table', async () => {
    let records = [...mockVarianceRecords];
    component.createTableRows(records);
    for (const record of records) {
      expect(record.subAreaId).toEqual(record.pk.split('::')[1]);
      expect(record.activity).toEqual(record.pk.split('::')[2]);
    }
  })

  it('formats dates', async () => {
    expect(component.formatDate('202306')).toEqual('June 2023');
  })

  it('formats activities', async () => {
    expect(component.formatActivityForUrl('Day Use')).toEqual('day-use');
  })

  it('navigates to the records url', async () => {
    let routerSpy = spyOn(component['router'], 'navigate');
    let record = mockVarianceRecords[0];
    let route = component.formatActivityForUrl(record.activity);
    component.viewRecord(record);
    component.viewRecord(mockVarianceRecords[0]);
    expect(routerSpy).toHaveBeenCalledWith([`/enter-data/${route}`], {
      queryParams: {
        date: record.date,
        orcs: record.orcs,
        subAreaId: record.subAreaId,
        subAreaName: record.subAreaName,
        parkName: record.parkName,
      }
    });
  });

  it('adjusts the list width on change', async () => {
    let setWidthSpy = spyOn(component, 'setWidth');
    component.ngAfterViewChecked();
    expect(setWidthSpy).toHaveBeenCalled();
  })

});
