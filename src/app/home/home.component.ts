import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // This can be pulled in via the config.
  public cardConfig = [
    {
      cardHeader: 'Enter Data',
      cardTitle: 'Data input tools',
      cardText:
        'Enter attendance and revenue numbers. You can also view and edit past enteries.',
      navigation: 'enter-data',
    },
    {
      cardHeader: 'Export reports',
      cardTitle: 'Tools for exporting reports',
      cardText: 'Export reports based on selected parameters.',
      navigation: 'export-reports',
    },
  ];
  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
