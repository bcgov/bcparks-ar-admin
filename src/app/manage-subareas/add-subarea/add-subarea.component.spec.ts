import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubareaComponent } from './add-subarea.component';

describe('AddSubareaComponent', () => {
  let component: AddSubareaComponent;
  let fixture: ComponentFixture<AddSubareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
