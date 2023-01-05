import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { DataService } from '../../services/data.service';
import { FiscalYearLockTableComponent } from './fiscal-year-lock-table.component';

describe('FiscalYearLockTableComponent', () => {
  let component: FiscalYearLockTableComponent;
  let fixture: ComponentFixture<FiscalYearLockTableComponent>;
  let dataService: DataService;

  const mockDataService = {
    getItemValue: () => {
      return of([
        {
            isLocked: true
        }])
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiscalYearLockTableComponent],
      providers: [
        {
          provide: DataService, useValue: mockDataService
        }
      ]
    }).compileComponents();
    dataService = TestBed.inject(DataService);
  });

  it('should test all elements of the table component', async () => {
    fixture = TestBed.createComponent(FiscalYearLockTableComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
    expect(component.tableRows.length).toBe(1);

    await component.ngOnInit();
    await fixture.isStable();

    expect(component.columnSchema.length).toBe(3);

    expect(component.getFiscalYearString('2012')).toEqual('2011–12');
    expect(component.columnSchema[0].mapValue({ sk: '2012', isLocked: true })).toBe('2012');
    expect(component.columnSchema[0].mapDisplay?.({ sk: '2012', isLocked: true })).toBe('2011–12');
    expect(component.columnSchema[1].mapValue()).toBe('All Parks');
    expect(component.columnSchema[2].mapValue({ sk: '2012', isLocked: true })).toBe(true);
    expect(component.columnSchema[2].mapValue({ sk: '2012', isLocked: false })).toBe(false);
    expect(component.columnSchema[2].cellTemplate?.({ sk: '2012', isLocked: false })?.data?.data).toBe({ sk: '2012', isLocked: false });
  });
});