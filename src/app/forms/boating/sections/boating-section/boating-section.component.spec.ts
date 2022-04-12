import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatingSectionComponent } from './boating-section.component';

describe('BoatingSectionComponent', () => {
  let component: BoatingSectionComponent;
  let fixture: ComponentFixture<BoatingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
