import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ConfigService, HttpClient, HttpHandler ]
    });
    loggerService = TestBed.inject(LoggerService);
    spyOn(LoggerService.prototype, "log").and.callThrough();
  });

  it('should be created', () => {
    expect(loggerService).toBeTruthy();
    loggerService.debug('Some Debug Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(1);

    loggerService.info('Some Info Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(2);

    loggerService.warn('Some Warn Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(3);

    loggerService.fatal('Some Fatal Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(4);
  });
});
