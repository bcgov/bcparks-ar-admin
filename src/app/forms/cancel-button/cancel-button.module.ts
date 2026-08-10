import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelButtonComponent } from './cancel-button.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [CommonModule, ModalModule, CancelButtonComponent],
    exports: [CancelButtonComponent],
})
export class CancelButtonModule {}
