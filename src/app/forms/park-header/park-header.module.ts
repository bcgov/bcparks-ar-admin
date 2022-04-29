import { NgModule } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ParkHeaderComponent } from './park-header.component';

@NgModule({
  declarations: [ParkHeaderComponent],
  exports: [ParkHeaderComponent],
  providers: [DataService],
})
export class ParkHeaderModule {}
