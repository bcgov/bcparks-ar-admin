import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAndVehiclesComponent } from './people-and-vehicles.component';

describe('PeopleAndVehiclesComponent', () => {
  let component: PeopleAndVehiclesComponent;
  let fixture: ComponentFixture<PeopleAndVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleAndVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleAndVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
