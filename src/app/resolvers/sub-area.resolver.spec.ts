import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { convertToParamMap } from '@angular/router';

import { SubAreaResolver } from './sub-area.resolver';
import { SubAreaService } from '../services/sub-area.service';

describe('SubAreaResolver', () => {
  let resolver: SubAreaResolver;
  let router;

  let params = {
    date: new Date(),
    orcs: '0001',
    subAreaId: '0001',
  }

  let paramsMissingData = {
    date: new Date()
  }

  const route: ActivatedRouteSnapshot = {
    queryParams: params,
    url: [],
    params: {},
    fragment: null,
    data: {},
    outlet: '',
    component: null,
    routeConfig: null,
    title: undefined,
    root: new ActivatedRouteSnapshot,
    parent: null,
    firstChild: null,
    children: [],
    pathFromRoot: [],
    paramMap: convertToParamMap(params),
    queryParamMap: convertToParamMap(params)
  }

  const routeMissingData: ActivatedRouteSnapshot = {
    queryParams: paramsMissingData,
    url: [],
    params: {},
    fragment: null,
    data: {},
    outlet: '',
    component: null,
    routeConfig: null,
    title: undefined,
    root: new ActivatedRouteSnapshot,
    parent: null,
    firstChild: null,
    children: [],
    pathFromRoot: [],
    paramMap: convertToParamMap(paramsMissingData),
    queryParamMap: convertToParamMap(paramsMissingData)
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        ConfigService
      ],
    });
    router = TestBed.inject(Router);
    resolver = TestBed.inject(SubAreaResolver);
  });

  it('should be created and call fetchSubArea', async () => {
    const serviceSpy = spyOn(SubAreaService.prototype, "fetchSubArea")
      .and.returnValue(Promise.resolve({}) as any);
    expect(resolver).toBeTruthy();
    await resolver.resolve(route);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should be created and not fetch data', async () => {
    const serviceSpy = spyOn(SubAreaService.prototype, "fetchSubArea")
      .and.returnValue(Promise.resolve({}) as any);
    expect(resolver).toBeTruthy();
    await resolver.resolve(route);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
});
