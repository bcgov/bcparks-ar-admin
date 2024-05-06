import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-historical-pill',
  templateUrl: './historical-pill.component.html',
  styleUrls: ['./historical-pill.component.scss']
})
export class HistoricalPillComponent {
  @Input() matches: any;
  @Input() query: any;
  @Input() typeaheadTemplateMethods: any;

  // Custom typeahead formatter so that we can put 'historical' badges on subareas.
  getHighlightedMatch(item, query) {
    query = query.join(' ');
    let display = item.value;
    if (display.toLocaleLowerCase().indexOf(query) > -1) {
      const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
      const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length);
      const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
      return [
        '<span>' + left_str + '</span>',
        '<span>' + highlight_str + '</span>',
        '<span>' + right_str + '</span>',
      ];
    }
    else
      return [
        '<span>' + display + '</span>',
        '',
        '',
      ];
  }
}
