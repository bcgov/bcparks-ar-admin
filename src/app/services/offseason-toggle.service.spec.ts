import { TestBed } from '@angular/core/testing';
import { OffSeasonToggleService } from './offseason-toggle.service';

describe('OffSeasonToggleService', () => {
  let service: OffSeasonToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffSeasonToggleService]
    });
    service = TestBed.inject(OffSeasonToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with false value', (done: DoneFn) => {
    service.getOffSeasonToggle.subscribe((value: boolean) => {
      expect(value).toBeFalse();
      done();
    });
  });

  it('should update value when setOffSeasonToggle is called', (done: DoneFn) => {
    const newValue = true;

    service.setOffSeasonToggle(newValue);

    service.getOffSeasonToggle.subscribe((value: boolean) => {
      expect(value).toBeTrue();
      done();
    });
  });
});
