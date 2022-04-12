import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCampingComponent } from './backcountry-camping.component';

describe('BackcountryCampingComponent', () => {
  let component: BackcountryCampingComponent;
  let fixture: ComponentFixture<BackcountryCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackcountryCampingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
