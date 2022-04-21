import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { InfiniteLoadingBarService } from '../shared/components/infinite-loading-bar/infinite-loading-bar.service';
import { ConfigService } from './config.service';
import { DataService } from './data.service';
import { EventService } from './event.service';

import { ParkService } from './park.service';
import { ToastService } from './toast.service';

describe('ParkService', () => {
  let service: ParkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        DataService,
        EventService,
        ToastService,
        HttpHandler,
        ConfigService,
        InfiniteLoadingBarService,
      ],
    });
    service = TestBed.inject(ParkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
