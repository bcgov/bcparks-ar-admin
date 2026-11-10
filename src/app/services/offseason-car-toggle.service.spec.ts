import { TestBed } from '@angular/core/testing';
import { OffSeasonCarToggleService } from './offseason-car-toggle.service';

describe('OffSeasonCarToggleService', () => {
  let service: OffSeasonCarToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffSeasonCarToggleService]
    });
    service = TestBed.inject(OffSeasonCarToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with false value', (done: DoneFn) => {
    service.getOffSeasonCarToggle.subscribe((value: boolean) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should update value when setOffSeasonCarToggle is called', (done: DoneFn) => {
    const newValue = true;

    service.setOffSeasonCarToggle(newValue);

    service.getOffSeasonCarToggle.subscribe((value: boolean) => {
      expect(value).toBeTrue();
      done();
    });
  });
});
