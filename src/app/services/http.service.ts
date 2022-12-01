import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlasDataAPI } from '../shared/atlas-data-api';
/** This service was created to Implement Request to Atlas Data Api with - Api Key */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  atlasApi: AtlasDataAPI = new AtlasDataAPI();

  dataAPI: string = this.atlasApi.dataAPI;
  url: string =
    `https://data.mongodb-api.com/app/` +
    this.dataAPI +
    `/endpoint/data/v1/action/find`;

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks() {
    const getTasksBody = {
      dataSource: 'tasks-example',
      database: 'AngularPractice',
      collection: 'tasks',
    };
    const httpHeader = new HttpHeaders();
    httpHeader.set('Content-Type', 'application/json');
    this.http.post(this.url, getTasksBody).subscribe((tasks) => {
      console.log(tasks);
    });
  }
}
