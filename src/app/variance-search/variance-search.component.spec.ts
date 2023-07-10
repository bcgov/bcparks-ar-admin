import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceSearchComponent } from './variance-search.component';

describe('VarianceSearchComponent', () => {
  let component: VarianceSearchComponent;
  let fixture: ComponentFixture<VarianceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarianceSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarianceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
