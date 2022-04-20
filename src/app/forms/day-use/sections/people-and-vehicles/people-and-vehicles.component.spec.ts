import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAndVehiclesComponent } from './people-and-vehicles.component';
import { PeopleAndVehiclesModule } from './people-and-vehicles.module';

describe('PeopleAndVehiclesComponent', () => {
  let component: PeopleAndVehiclesComponent;
  let fixture: ComponentFixture<PeopleAndVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleAndVehiclesComponent],
      imports: [PeopleAndVehiclesModule],
    }).compileComponents();
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
