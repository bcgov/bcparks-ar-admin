import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ParkHeaderModule } from '../park-header/park-header.module';

import { BackcountryCampingComponent } from './backcountry-camping.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('BackcountryCampingComponent', () => {
  let component: BackcountryCampingComponent;
  let fixture: ComponentFixture<BackcountryCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcountryCampingComponent],
      imports: [
        RouterTestingModule,
        ParkHeaderModule,
      ],
      providers: [HttpClient, HttpHandler, ConfigService, BsModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
