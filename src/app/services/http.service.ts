import { AtlasDataAPI } from './../shared/atlas-data-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/** This service was created to Implement Request to Atlas Data Api with - Api Key */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  atlasApi: AtlasDataAPI = new AtlasDataAPI();
  url: string =
    'https://data.mongodb-api.com/app/data-dqnco/endpoint/data/v1/action/find';
  dataAPI: string = this.atlasApi.dataAPI;
  apiKey: string = this.atlasApi.apiKey;
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set(
      'api-key',
      'b192gNI1rmVXNUI41xBxSDmY88zOBpe2TVFdP3k2WQ2aHNI0Jtr1XhPmmCtp9zMN'
    );
  /* .set('Access-Control-Allow-Origin', '*') */
  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks() {
    this.http.get(this.url, { headers: this.headers }).subscribe((tasks) => {
      console.log(tasks);
    });
  }
}
