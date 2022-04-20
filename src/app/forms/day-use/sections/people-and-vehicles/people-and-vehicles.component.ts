import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-people-and-vehicles',
  templateUrl: './people-and-vehicles.component.html',
  styleUrls: ['./people-and-vehicles.component.scss']
})
export class PeopleAndVehiclesComponent implements OnInit {
  @Input() peopleAndVehiclesTrailField = new FormControl;
  @Input() peopleAndVehiclesVehicleField = new FormControl;
  @Input() peopleAndVehiclesBusField = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
