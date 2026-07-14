import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayUseAccordionComponent } from './day-use-accordion.component';
import { MockData } from 'src/app/shared/utils/mock.data';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-accordion',
  template: '',
  standalone: true
})
class StubAccordionComponent {
  @Input() icon: any;
  @Input() secondaryText: any;
  @Input() editLink: any;
  @Input() recordLock: any;
  @Input() isLegacy: any;
  @Input() variance: any;
}

@Component({
  selector: 'app-accordion-summaries',
  template: '',
  standalone: true
})
class StubAccordionSummariesComponent {
  @Input() summaries: any;
}

@Component({
  selector: 'app-accordion-notes',
  template: '',
  standalone: true
})
class StubAccordionNotesComponent {
  @Input() notes: any;
}

describe('DayUseAccordionComponent', () => {
  let component: DayUseAccordionComponent;
  let fixture: ComponentFixture<DayUseAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayUseAccordionComponent],
      imports: [
        RouterTestingModule,
        StubAccordionComponent,
        StubAccordionSummariesComponent,
        StubAccordionNotesComponent
      ],
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
