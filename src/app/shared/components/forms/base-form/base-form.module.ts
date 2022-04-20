import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { DataService } from 'src/app/services/data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class BaseFormModule {}
