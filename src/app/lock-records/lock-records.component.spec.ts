import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfigService } from '../services/config.service';

import { LockRecordsComponent } from './lock-records.component';

describe('LockRecordsComponent', () => {
  let component: LockRecordsComponent;
  let fixture: ComponentFixture<LockRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LockRecordsComponent],
    imports: [BsDatepickerModule.forRoot()],
    providers: [ConfigService, provideHttpClient(withInterceptorsFromDi())]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
