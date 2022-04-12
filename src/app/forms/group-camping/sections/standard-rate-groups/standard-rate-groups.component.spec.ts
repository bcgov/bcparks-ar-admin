import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardRateGroupsComponent } from './standard-rate-groups.component';

describe('StandardRateGroupsComponent', () => {
  let component: StandardRateGroupsComponent;
  let fixture: ComponentFixture<StandardRateGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardRateGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardRateGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
