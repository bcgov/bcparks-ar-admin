import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleAndVehiclesComponent } from './people-and-vehicles.component';

@NgModule({
  declarations: [PeopleAndVehiclesComponent],
  imports: [CommonModule],
  exports: [PeopleAndVehiclesComponent],
})
export class PeopleAndVehiclesModule {}
