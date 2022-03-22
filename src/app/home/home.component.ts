import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { DataService } from '../services/data.service';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private alive = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.alive = false;
  }
}
