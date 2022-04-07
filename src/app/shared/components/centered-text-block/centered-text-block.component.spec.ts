import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenteredTextBlockComponent } from './centered-text-block.component';

describe('CenteredTextBlockComponent', () => {
  let component: CenteredTextBlockComponent;
  let fixture: ComponentFixture<CenteredTextBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenteredTextBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenteredTextBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
