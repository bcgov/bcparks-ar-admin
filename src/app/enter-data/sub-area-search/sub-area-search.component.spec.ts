import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/services/config.service';

import { SubAreaSearchComponent } from './sub-area-search.component';

describe('SubAreaSearchComponent', () => {
  let component: SubAreaSearchComponent;
  let fixture: ComponentFixture<SubAreaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubAreaSearchComponent],
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler, ConfigService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAreaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
