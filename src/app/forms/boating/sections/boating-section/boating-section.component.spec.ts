import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculationDisplayModule } from 'src/app/shared/components/forms/calculation-display/calculation-display.module';
import { TextInputModule } from 'src/app/shared/components/forms/text-input/text-input.module';

import { BoatingSectionComponent } from './boating-section.component';

describe('BoatingSectionComponent', () => {
  let component: BoatingSectionComponent;
  let fixture: ComponentFixture<BoatingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoatingSectionComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        TextInputModule,
        CalculationDisplayModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
