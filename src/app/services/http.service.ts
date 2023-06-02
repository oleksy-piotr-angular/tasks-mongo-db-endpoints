import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlasDataAPI } from '../shared/atlas-data-api';
import { Task } from './../models/task';

@Injectable()
export class HttpService {
  // this is a fragment of unsafe data to send a request - must be secret
  private readonly dataAPI: string = new AtlasDataAPI().dataAPI;
  private readonly urlDB: string =
    `https://data.mongodb-api.com/app/` +
    this.dataAPI +
    `/endpoint/data/v1/action/`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Array<Task>> {
    // prepare request Body for MongoDB_Atlas to receive data from noSQL storage
    const getTasksBody = {
      dataSource: 'tasks-example',
      database: 'AngularPractice',
      collection: 'tasks',
    };
    //prepare Headers to receive JSON in Object from MongoDB
    const myHttpHeader = new HttpHeaders();
    myHttpHeader.set('Content-Type', 'application/json');
    myHttpHeader.set('Access-Control-Request-Headers', '*');

    //set MongoDB Data API service
    const action = 'find';

    return this.http.post<Task[]>(this.urlDB + action, getTasksBody, {
      headers: myHttpHeader,
      responseType: 'json',
    });
  }

  saveOneTask(task: Task) {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      document: task,
    };

    const action = 'insertOne';

    this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
      console.log(data);
    });
  }

  removeDoneTasksFromDB() {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { isDone: true },
    };
    const action = 'deleteMany';
    this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
      console.log(data);
    });
  }

  updateOneTaskToDone(task: Task) {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { _id: { $oid: task._id } },
      update: {
        $set: {
          isDone: true,
          end: task.end,
        },
      },
    };

    const action = 'updateOne';

    this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
      console.log(data);
    });
  }

  removeOneTask(task: Task) {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { _id: { $oid: task._id } },
    };
    const action = 'deleteOne';

    this.http.post(this.urlDB + action, saveTasksBody).subscribe((data) => {
      console.log(data);
    });
  }
}
