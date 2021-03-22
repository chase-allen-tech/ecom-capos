import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment as env} from '../../environments/environment';

export const apiUrl = env.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {
  }

  getUrl(uri): string {
    return apiUrl + uri;
  }

  post(uri, data): any {
    return this.http.post<any>(this.getUrl(uri), data, {observe: 'response'});
  }

  get(uri, data: any = {}): any {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(key => {
      httpParams = httpParams.append(key, data[key]);
    });
    return this.http.get<any>(this.getUrl(uri), {params: httpParams, observe: 'response'});
  }

  put(uri, data): any {
    return this.http.put(this.getUrl(uri), data, {observe: 'response'});
  }

  delete(uri): any {
    return this.http.delete(this.getUrl(uri),     {observe: 'response'});
  }
}
