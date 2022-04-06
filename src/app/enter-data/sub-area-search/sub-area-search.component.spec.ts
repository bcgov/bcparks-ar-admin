import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAreaSearchComponent } from './sub-area-search.component';

describe('SubAreaSearchComponent', () => {
  let component: SubAreaSearchComponent;
  let fixture: ComponentFixture<SubAreaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAreaSearchComponent ]
    })
    .compileComponents();
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
