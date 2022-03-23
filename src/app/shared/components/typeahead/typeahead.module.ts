import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadComponent } from './typeahead.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TypeaheadComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [TypeaheadComponent],
})
export class TypeaheadModule {}
