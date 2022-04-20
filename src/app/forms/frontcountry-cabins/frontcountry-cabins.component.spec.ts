import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontcountryCabinsComponent } from './frontcountry-cabins.component';
import { FrontcountryCabinsModule } from './frontcountry-cabins.module';

describe('FrontcountryCabinsComponent', () => {
  let component: FrontcountryCabinsComponent;
  let fixture: ComponentFixture<FrontcountryCabinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontcountryCabinsComponent ],
      imports: [FrontcountryCabinsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontcountryCabinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
