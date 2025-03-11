import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubareasComponent } from './manage-subareas.component';

describe('ManageSubareasComponent', () => {
  let component: ManageSubareasComponent;
  let fixture: ComponentFixture<ManageSubareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubareasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
