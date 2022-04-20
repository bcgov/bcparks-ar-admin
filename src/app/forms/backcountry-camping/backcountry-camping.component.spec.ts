import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackcountryCampingComponent } from './backcountry-camping.component';
import { BackcountryCampingModule } from './backcountry-camping.module';

describe('BackcountryCampingComponent', () => {
  let component: BackcountryCampingComponent;
  let fixture: ComponentFixture<BackcountryCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackcountryCampingComponent ],
      imports: [BackcountryCampingModule]
    })
    .compileComponents();
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
