import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthRateGroupsComponent } from './youth-rate-groups.component';

describe('YouthRateGroupsComponent', () => {
  let component: YouthRateGroupsComponent;
  let fixture: ComponentFixture<YouthRateGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouthRateGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouthRateGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
