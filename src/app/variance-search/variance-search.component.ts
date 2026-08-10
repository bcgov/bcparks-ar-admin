import { Component } from '@angular/core';
import { VarianceFiltersComponent } from './variance-filters/variance-filters.component';
import { VarianceListComponent } from './variance-list/variance-list.component';

@Component({
    selector: 'app-variance-search',
    templateUrl: './variance-search.component.html',
    styleUrls: ['./variance-search.component.scss'],
    imports: [VarianceFiltersComponent, VarianceListComponent]
})
export class VarianceSearchComponent {

}
