import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlasDataAPI } from '../shared/atlas-data-api';
import { Task } from './../models/task';

@Injectable()
export class HttpService {
  private readonly dataAPI: string = new AtlasDataAPI().dataAPI;
  private readonly urlDB: string =
    `https://data.mongodb-api.com/app/` +
    this.dataAPI +
    `/endpoint/data/v1/action/`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const body = {
      dataSource: 'tasks-example',
      database: 'AngularPractice',
      collection: 'tasks',
    };
    const myHttpHeader = new HttpHeaders();
    myHttpHeader.set('Content-Type', 'application/json');
    myHttpHeader.set('Access-Control-Request-Headers', '*');
    const action = 'find';

    return this.http.post<Task[]>(this.urlDB + action, body, {
      headers: myHttpHeader,
      responseType: 'json',
    });
  }

  saveOneTask(
    task: Omit<Task, '_id'>
  ): Observable<{ insertedId: { $oid: string } }> {
    const body = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      document: task,
    };
    const action = 'insertOne';

    return this.http.post<{ insertedId: { $oid: string } }>(
      this.urlDB + action,
      body
    );
  }

  removeDoneTasksFromDB(): Observable<{ deletedCount: number }> {
    const body = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { isDone: true },
    };
    const action = 'deleteMany';

    return this.http.post<{ deletedCount: number }>(this.urlDB + action, body);
  }

  updateOneTaskToDone(
    task: Task
  ): Observable<{ matchedCount: number; modifiedCount: number }> {
    const body = {
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
      body
    );
  }

  removeOneTask(task: Task): Observable<{ deletedCount: number }> {
    const body = {
      collection: 'tasks',
      database: 'AngularPractice',
      dataSource: 'tasks-example',
      filter: { _id: { $oid: task._id } },
    };
    const action = 'deleteOne';

    return this.http.post<{ deletedCount: number }>(this.urlDB + action, body);
  }
}
