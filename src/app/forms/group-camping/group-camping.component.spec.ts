import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';
import { ParkHeaderModule } from '../park-header/park-header.module';

import { GroupCampingComponent } from './group-camping.component';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('GroupCampingComponent', () => {
  let component: GroupCampingComponent;
  let fixture: ComponentFixture<GroupCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupCampingComponent],
      imports: [RouterTestingModule, ParkHeaderModule],
      providers: [HttpClient, HttpHandler, ConfigService, BsModalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
