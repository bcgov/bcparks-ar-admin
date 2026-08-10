import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelButtonComponent } from './cancel-button.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [CancelButtonComponent],
  imports: [CommonModule, ModalModule],
  exports: [CancelButtonComponent],
})
export class CancelButtonModule {}
