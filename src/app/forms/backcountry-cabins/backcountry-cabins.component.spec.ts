import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ParkHeaderModule } from '../park-header/park-header.module';

import { BackcountryCabinsComponent } from './backcountry-cabins.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('BackcountryCabinsComponent', () => {
  let component: BackcountryCabinsComponent;
  let fixture: ComponentFixture<BackcountryCabinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackcountryCabinsComponent],
      imports: [RouterTestingModule, ParkHeaderModule],
      providers: [HttpClient, HttpHandler, ConfigService, BsModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackcountryCabinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
