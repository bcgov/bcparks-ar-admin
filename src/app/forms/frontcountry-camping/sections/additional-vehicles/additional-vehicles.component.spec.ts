import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalVehiclesComponent } from './additional-vehicles.component';
import { AdditionalVehiclesModule } from './additional-vehicles.module';

describe('AdditionalVehiclesComponent', () => {
  let component: AdditionalVehiclesComponent;
  let fixture: ComponentFixture<AdditionalVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalVehiclesComponent ],
      imports: [AdditionalVehiclesModule]
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
