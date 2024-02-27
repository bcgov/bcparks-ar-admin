import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayUseAccordionComponent } from './day-use-accordion.component';
import { MockData } from 'src/app/shared/utils/mock.data';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('DayUseAccordionComponent', () => {
  let component: DayUseAccordionComponent;
  let fixture: ComponentFixture<DayUseAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayUseAccordionComponent],
      imports: [RouterTestingModule],
      providers: [
        ConfigService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayUseAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: build this out to check more than just the length of the summaries array
  it('builds accordion', async () => {
    component.data = MockData.mockDayUseRecord_1;
    component.buildAccordion();
    expect(component.summaries.length).toEqual(2);
  });

  it('builds legacy accordion', async () => {
    component.data = MockData.mockDayUseRecord_Legacy;
    component.buildAccordion();
    expect(component.summaries.length).toEqual(2);
  });

  it('unsubscribes on destroy', async () => {
    const subSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subSpy).toHaveBeenCalled();
  });
});
