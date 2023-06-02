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

  getTasks(): Observable<Task[]> {
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

  saveOneTask(
    task: Omit<Task, '_id'>
  ): Observable<{ insertedId: { $oid: string } }> {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      document: task,
    };

    const action = 'insertOne';
    return this.http.post<{ insertedId: { $oid: string } }>(
      this.urlDB + action,
      saveTasksBody
    );
  }

  removeDoneTasksFromDB(): Observable<{ deletedCount: number }> {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { isDone: true },
    };
    const action = 'deleteMany';
    return this.http.post<{ deletedCount: number }>(
      this.urlDB + action,
      saveTasksBody
    );
  }

  updateOneTaskToDone(
    task: Task
  ): Observable<{ matchedCount: number; modifiedCount: number }> {
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
    return this.http.post<{ matchedCount: number; modifiedCount: number }>(
      this.urlDB + action,
      saveTasksBody
    );
  }

  removeOneTask(task: Task): Observable<{ deletedCount: number }> {
    const saveTasksBody = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { _id: { $oid: task._id } },
    };
    const action = 'deleteOne';
    return this.http.post<{ deletedCount: number }>(
      this.urlDB + action,
      saveTasksBody
    );
  }
}
