import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCampingSectionComponent } from './backcountry-camping-section.component';

describe('BackcountryCampingSectionComponent', () => {
  let component: BackcountryCampingSectionComponent;
  let fixture: ComponentFixture<BackcountryCampingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackcountryCampingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCampingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
