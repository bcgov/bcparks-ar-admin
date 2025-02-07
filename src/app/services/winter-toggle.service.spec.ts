import { TestBed } from '@angular/core/testing';
import { WinterToggleService } from './winter-toggle.service';

describe('WinterToggleService', () => {
  let service: WinterToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinterToggleService]
    });
    service = TestBed.inject(WinterToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with false value', (done: DoneFn) => {
    service.getWinterToggle.subscribe((value: boolean) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should update value when setWinterToggle is called', (done: DoneFn) => {
    const newValue = true;

    service.setWinterToggle(newValue);

    service.getWinterToggle.subscribe((value: boolean) => {
      expect(value).toBeTrue();
      done();
    });
  });
});
