import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ParkHeaderModule } from '../park-header/park-header.module';
import { DayUseComponent } from './day-use.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('DayUseComponent', () => {
  let component: DayUseComponent;
  let fixture: ComponentFixture<DayUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayUseComponent],
      imports: [RouterTestingModule, ParkHeaderModule],
      providers: [HttpClient, HttpHandler, ConfigService, BsModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
