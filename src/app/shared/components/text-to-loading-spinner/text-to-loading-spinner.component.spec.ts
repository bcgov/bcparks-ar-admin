import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToLoadingSpinnerComponent } from './text-to-loading-spinner.component';

describe('TextToLoadingSpinnerComponent', () => {
  let component: TextToLoadingSpinnerComponent;
  let fixture: ComponentFixture<TextToLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextToLoadingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToLoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
