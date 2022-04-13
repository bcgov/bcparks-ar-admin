import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatingComponent } from './boating.component';

describe('BoatingComponent', () => {
  let component: BoatingComponent;
  let fixture: ComponentFixture<BoatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatingComponent ]
    })
    .compileComponents();
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
