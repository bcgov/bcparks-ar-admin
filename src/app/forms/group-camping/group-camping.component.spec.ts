import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';

import { GroupCampingComponent } from './group-camping.component';
import { GroupCampingModule } from './group-camping.module';

describe('GroupCampingComponent', () => {
  let component: GroupCampingComponent;
  let fixture: ComponentFixture<GroupCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupCampingComponent],
      imports: [GroupCampingModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, ConfigService],
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
