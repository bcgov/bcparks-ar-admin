import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ParkHeaderModule } from '../park-header/park-header.module';

import { BoatingComponent } from './boating.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('BoatingComponent', () => {
  let component: BoatingComponent;
  let fixture: ComponentFixture<BoatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoatingComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ParkHeaderModule,
      ],
      providers: [HttpClient, HttpHandler, ConfigService, BsModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
