import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricalPillComponent } from './historical-pill.component';

describe('HistoricalPillComponent', () => {
  let component: HistoricalPillComponent;
  let fixture: ComponentFixture<HistoricalPillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalPillComponent]
    });
    fixture = TestBed.createComponent(HistoricalPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should highlight typeahead properly', async() => {
    expect(component.getHighlightedMatch({value:'string'}, ['str'])).toEqual({
      left: '<span></span>',
      highlight: '<span>str</span>',
      right: '<span>ing</span>'}
    )
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
