import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlasDataAPI } from '../shared/atlas-data-api';
import { Task } from './../models/task';

/** This service was created to Implement Request to Atlas Data Api with - Api Key */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private atlasApi: AtlasDataAPI = new AtlasDataAPI();

  readonly dataAPI: string = this.atlasApi.dataAPI; // this is unsafe data to send a request
  readonly urlDB: string =
    `https://data.mongodb-api.com/app/` +
    this.dataAPI +
    `/endpoint/data/v1/action/`; // prepare URL to send Request to MongoDB_Atlas

  constructor(private http: HttpClient) {
    this.getTasks();
  }

  getTasks() {
    const getTasksBody = {
      dataSource: 'tasks-example',
      database: 'AngularPractice',
      collection: 'tasks',
    }; // prepare request Body for MongoDB_Atlas to recieve data from noSQL storage
    const myHttpHeader = new HttpHeaders();
    myHttpHeader.set('Content-Type', 'application/xml');
    myHttpHeader.set('Access-Control-Request-Headers', '*');
    //above we prepare Header to recieve JSON in Object from MongoDB
    const action = 'find';
    this.http
      .post(this.urlDB + action, getTasksBody, {
        headers: myHttpHeader,
        responseType: 'json',
      })
      .subscribe((tasks) => {
        // above is constructed correct Request to MongoDB Atlas with body to make specific action | Receive answer as an Object with Array of stored values
        const requestToArray = Object.values(tasks); // because after request we receive object as an answer, we need to change values into Array
        const tasksList = requestToArray[0]; // this Array element keeps nested Array with tasksList
        for (let i in tasksList) {
          // print each element of Array
          console.log(tasksList[i]);
        }
      });
  }

  saveTasks(list: Array<Task> = []) {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      documents: list,
    }; // prepare request Body for MongoDB_Atlas to recieve data from noSQL data storage
    const action = 'insertMany';
    this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
      console.log(data);
    });
  }

  removeDoneTasks() {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { isDone: true },
    }; // prepare request Body for MongoDB_Atlas | to remove data with specific condition from noSQL data storage
    const action = 'deleteMany';
    this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
      console.log(data);
    });
  }
}
