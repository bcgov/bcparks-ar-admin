import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.scss'],
})
export class EnterDataComponent {
  public text = `Select the data and location above for the Attendance and Revenue data you
  want to enter. If you want to view past enteries, you can do that by selecting
  the date and location you want to view.`;

  // If null show text.
  // If array length of zero, say no results.
  // Else show sub-area accordion.
  public subAreas: any = null;

  constructor(protected dataService: DataService) {}
}
