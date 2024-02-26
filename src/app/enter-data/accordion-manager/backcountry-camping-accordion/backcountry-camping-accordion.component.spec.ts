import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCampingAccordionComponent } from './backcountry-camping-accordion.component';
import { MockData } from 'src/app/shared/utils/mock.data';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('BackcountryCampingAccordionComponent', () => {
  let component: BackcountryCampingAccordionComponent;
  let fixture: ComponentFixture<BackcountryCampingAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcountryCampingAccordionComponent],
      imports: [RouterTestingModule],
      providers: [
        ConfigService,
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCampingAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    // TODO: build this out to check more than just the length of the summaries array
    it('builds accordion', async () => {
      component.data = MockData.mockBackcountryCampingRecord_1;
      component.buildAccordion();
      expect(component.summaries.length).toEqual(1);
    });

    it('builds legacy accordion', async () => {
      component.data = MockData.mockBackcountryCampingRecord_Legacy;
      component.buildAccordion();
      expect(component.summaries.length).toEqual(1);
    });

    it('unsubscribes on destroy', async () => {
      const subSpy = spyOn<any>(component['subscriptions'], 'unsubscribe');
      component.ngOnDestroy();
      expect(subSpy).toHaveBeenCalled();
    });
});
