import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-other-frontcountry-camping-revenue',
  templateUrl: './other-frontcountry-camping-revenue.component.html',
  styleUrls: ['./other-frontcountry-camping-revenue.component.scss']
})
export class OtherFrontcountryCampingRevenueComponent implements OnInit {
  @Input() otherRevenueGrossSaniField = new FormControl;
  @Input() otherRevenueElectricalField = new FormControl;
  @Input() otherRevenueShowerField = new FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
