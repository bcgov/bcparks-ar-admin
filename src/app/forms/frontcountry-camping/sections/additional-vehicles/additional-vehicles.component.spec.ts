import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalVehiclesComponent } from './additional-vehicles.component';

describe('AdditionalVehiclesComponent', () => {
  let component: AdditionalVehiclesComponent;
  let fixture: ComponentFixture<AdditionalVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
