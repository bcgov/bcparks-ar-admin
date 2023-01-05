import { TestBed } from '@angular/core/testing';
import { Constants } from '../shared/utils/constants';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();

    let subArray: any[] = [];
    let subLoadingArray: any[] = [];
    subLoadingArray.push(false);
    subLoadingArray.push(true);
    subLoadingArray.push(false);

    // Need to push the first sub in there
    subArray.push({});

    const obj = {
      'enterDataPark': {
        'loading': true
      }
    };
    subArray.push(obj);

    const obj2 = {};
    subArray.push(obj2);

    const sub = service.getFetchList().subscribe(
      async (obs) => {
        const poppedItem = subArray.pop();
        expect(obs).toEqual(poppedItem);
      }
    );
    const subLoading = service.getLoadingStatus().subscribe(
      async (obsLoading) => {
        const poppedItem = subLoadingArray.pop();
        expect(obsLoading).toEqual(poppedItem);
      }
    );
    await service.addToFetchList(Constants.dataIds.ENTER_DATA_PARK);
    await service.removeToFetchList(Constants.dataIds.ENTER_DATA_PARK);

    sub.unsubscribe();
    subLoading.unsubscribe();
  });

});
