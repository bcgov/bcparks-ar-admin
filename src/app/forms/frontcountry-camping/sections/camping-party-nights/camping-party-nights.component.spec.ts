import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingPartyNightsComponent } from './camping-party-nights.component';
import { CampingPartyNightsModule } from './camping-party-nights.module';

describe('CampingPartyNightsComponent', () => {
  let component: CampingPartyNightsComponent;
  let fixture: ComponentFixture<CampingPartyNightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingPartyNightsComponent ],
      imports: [CampingPartyNightsModule]
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
