import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PicklistComponent } from './picklist.component';

@NgModule({
  declarations: [
    PicklistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PicklistComponent
  ]
})
export class PicklistModule { }
