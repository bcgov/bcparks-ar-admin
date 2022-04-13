import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingPartyNightsComponent } from './camping-party-nights.component';

describe('CampingPartyNightsComponent', () => {
  let component: CampingPartyNightsComponent;
  let fixture: ComponentFixture<CampingPartyNightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingPartyNightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampingPartyNightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
