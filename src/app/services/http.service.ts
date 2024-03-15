import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtlasDataAPI } from '../shared/atlas-data-api';
import { Task } from './../models/task';

@Injectable()
export class HttpService {
  private readonly apIUrl = new AtlasDataAPI().apiUrl;

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
    const action = '/action/find';

    return this.http.post<Task[]>(this.apIUrl + action, body, {
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
    const action = '/action/insertOne';

    return this.http.post<{ insertedId: { $oid: string } }>(
      this.apIUrl + action,
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
    const action = '/action/deleteMany';

    return this.http.post<{ deletedCount: number }>(this.apIUrl + action, body);
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
    const action = '/action/updateOne';

    return this.http.post<{ matchedCount: number; modifiedCount: number }>(
      this.apIUrl + action,
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
    const action = '/action/deleteOne';

    return this.http.post<{ deletedCount: number }>(this.apIUrl + action, body);
  }
}
