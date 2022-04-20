import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-picnic-shelters',
  templateUrl: './picnic-shelters.component.html',
  styleUrls: ['./picnic-shelters.component.scss']
})
export class PicnicSheltersComponent implements OnInit {
  @Input() picnicRevenueShelterControl = new FormControl;
  @Input() picnicRevenueGrossControl = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
