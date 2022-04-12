import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicnicSheltersComponent } from './picnic-shelters.component';

describe('PicnicSheltersComponent', () => {
  let component: PicnicSheltersComponent;
  let fixture: ComponentFixture<PicnicSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicnicSheltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicnicSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
