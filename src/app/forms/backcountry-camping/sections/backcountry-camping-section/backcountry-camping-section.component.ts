import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-backcountry-camping-section',
  templateUrl: './backcountry-camping-section.component.html',
  styleUrls: ['./backcountry-camping-section.component.scss']
})
export class BackcountryCampingSectionComponent implements OnInit {
  @Input() peopleField = new FormControl; 
  @Input() grossCampingRevenueField = new FormControl; 

  constructor() { }

  ngOnInit(): void {
  }

}
