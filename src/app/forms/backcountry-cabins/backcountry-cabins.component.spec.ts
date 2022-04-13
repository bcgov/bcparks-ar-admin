import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCabinsComponent } from './backcountry-cabins.component';

describe('BackcountryCabinsComponent', () => {
  let component: BackcountryCabinsComponent;
  let fixture: ComponentFixture<BackcountryCabinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackcountryCabinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCabinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
