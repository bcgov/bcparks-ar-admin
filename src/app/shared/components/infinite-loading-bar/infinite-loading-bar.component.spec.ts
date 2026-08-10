import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteLoadingBarComponent } from './infinite-loading-bar.component';

describe('InfiniteLoadingBarComponent', () => {
  let component: InfiniteLoadingBarComponent;
  let fixture: ComponentFixture<InfiniteLoadingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [InfiniteLoadingBarComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteLoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
