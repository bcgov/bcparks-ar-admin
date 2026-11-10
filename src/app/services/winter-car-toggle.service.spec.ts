import { TestBed } from '@angular/core/testing';
import { WinterCarToggleService } from './winter-car-toggle.service';

describe('WinterCarToggleService', () => {
  let service: WinterCarToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinterCarToggleService]
    });
    service = TestBed.inject(WinterCarToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with false value', (done: DoneFn) => {
    service.getWinterCarToggle.subscribe((value: boolean) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should update value when setWinterCarToggle is called', (done: DoneFn) => {
    const newValue = true;

    service.setWinterCarToggle(newValue);

    service.getWinterCarToggle.subscribe((value: boolean) => {
      expect(value).toBeTrue();
      done();
    });
  });
});
