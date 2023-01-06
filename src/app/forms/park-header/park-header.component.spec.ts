import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { DataService } from 'src/app/services/data.service';

import { ParkHeaderComponent } from './park-header.component';

describe('ParkHeaderComponent', () => {
  let component: ParkHeaderComponent;
  let fixture: ComponentFixture<ParkHeaderComponent>;
  let dataService;
  const mockDataService = {
    getItemValue: (item) => {
      return of({
        date: new Date(),
        parkName: 'Park Name',
        subAreaId: 'SubArea Id',
        orcs: '1234'
      })
    }
  }
  const mockDataServiceNoDate = {
    getItemValue: (item) => {
      return of({
        parkName: 'Park Name',
        subAreaId: 'SubArea Id',
        orcs: '1234'
      })
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkHeaderComponent],
      providers: [
        {
          provide: DataService, useValue: mockDataService
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    // Nothing
  });

  it('should create, subscribe and destroy', async () => {
    fixture = TestBed.createComponent(ParkHeaderComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.parkName).toEqual('Park Name');

    const subSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    await component.ngOnDestroy();
    expect(subSpy).toHaveBeenCalledTimes(1);
  });

  it('should set date to -', async () => {
    TestBed.overrideProvider(DataService, { useValue: mockDataServiceNoDate });
    fixture = TestBed.createComponent(ParkHeaderComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.date).toEqual('-');
  });
});
