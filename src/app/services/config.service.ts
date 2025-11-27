import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

//
// This service/class provides a centralized place to persist config values
// (eg, to share values between multiple components).
//

@Injectable()
export class ConfigService {
  private configuration: any = {};

  constructor(private httpClient: HttpClient) {}
  /**
   * Initialize the Config Service.  Get configuration data from front-end build, or back-end if nginx
   * is configured to pass the /config endpoint to a dynamic service that returns JSON.
   */
  async init() {
    // Initially set the configuration and see if we should be contacting our hostname endpoint for
    // any configuration data.
    this.configuration = window['__env'];

    if (this.configuration?.configEndpoint !== undefined
        && this.configuration['configEndpoint'] === true) {
      try {
        // Construct the full config endpoint URL using API_LOCATION and API_PATH
        const apiLocation = this.configuration['API_LOCATION'] || '';
        const apiPath = this.configuration['API_PATH'] || '/api';
        const configUrl = `${apiLocation}${apiPath}/config`;
        
        this.configuration = await firstValueFrom(
          this.httpClient.get(configUrl)
        );
      } catch (e) {
        // If all else fails, we'll just use the variables found in env.js
        console.error('Error getting remote configuration:', e);
      }
    }

    if (this.configuration?.logLevel !== undefined
        && this.configuration['logLevel'] === 0) {
      console.log('Configuration:', this.configuration);
    }

    return Promise.resolve();
  }

  get logLevel(): any {
    if (window['__env'] && window['__env'].logLevel != undefined)
    // Can be overidden by the js console.
    return window['__env'].logLevel;
  }

  get config(): any {
    return this.configuration;
  }
}
