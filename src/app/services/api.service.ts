import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public token: string;
  public isMS: boolean; // IE, Edge, etc

  apiPath: string;
  env: 'local' | 'dev' | 'test' | 'prod';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiPath =
      this.configService.config['API_LOCATION'] +
      this.configService.config['API_PUBLIC_PATH'];
    this.env = this.configService.config['ENVIRONMENT'];
  }

  public getEnvironment(): string {
    return this.env;
  }

  // post(pk, obj, queryParamsObject = null): Promise<any> {
  //   let queryString = this.generateQueryString(queryParamsObject);
  //   return this.http.post<any>(`${this.apiPath}/${pk}?${queryString}`, obj, {}).toPromise();
  // }

  get(pk, queryParamsObject = null as any) {
    let queryString = this.generateQueryString(queryParamsObject);
    return this.http.get<any>(`${this.apiPath}/${pk}?${queryString}`, {});
  }

  // delete(pk, queryParamsObject = null): Promise<any> {
  //   let queryString = this.generateQueryString(queryParamsObject);
  //   return this.http.delete<any>(`${this.apiPath}/${pk}?${queryString}`, {}).toPromise();
  // }

  // getList(pk): Promise<any> {
  //   return this.http.get<any>(`${this.apiPath}/${pk}`, {}).toPromise();
  // }

  private generateQueryString(queryParamsObject) {
    let queryString = '';
    if (queryParamsObject) {
      for (let key of Object.keys(queryParamsObject)) {
        queryString += `&${key}=${queryParamsObject[key]}`;
      }
      queryString = queryString.substring(1);
    }
    return queryString;
  }
}
