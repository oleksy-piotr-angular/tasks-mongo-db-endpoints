import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './../models/task';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {
  private readonly apiUrl = environment.URL_ENDPOINT;
  private readonly data_source = environment.DATA_SOURCE;
  private readonly database = environment.DATABASE;
  private readonly collection = environment.COLLECTION;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    const body = {
      dataSource: this.data_source,
      database: this.database,
      collection: this.collection,
    };
    const myHttpHeader = new HttpHeaders();
    myHttpHeader.set('Content-Type', 'application/json');
    myHttpHeader.set('Access-Control-Request-Headers', '*');
    const action = '/action/find';

    return this.http.post<Task[]>(this.apiUrl + action, body, {
      headers: myHttpHeader,
      responseType: 'json',
    });
  }

  saveOneTask(
    task: Omit<Task, '_id'>
  ): Observable<{ insertedId: { $oid: string } }> {
    const body = {
      dataSource: this.data_source,
      database: this.database,
      collection: this.collection,

      document: task,
    };
    const action = '/action/insertOne';

    return this.http.post<{ insertedId: { $oid: string } }>(
      this.apiUrl + action,
      body
    );
  }

  removeDoneTasksFromDB(): Observable<{ deletedCount: number }> {
    const body = {
      dataSource: this.data_source,
      database: this.database,
      collection: this.collection,

      filter: { isDone: true },
    };
    const action = '/action/deleteMany';

    return this.http.post<{ deletedCount: number }>(this.apiUrl + action, body);
  }

  updateOneTaskToDone(
    task: Task
  ): Observable<{ matchedCount: number; modifiedCount: number }> {
    const body = {
      dataSource: this.data_source,
      database: this.database,
      collection: this.collection,

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
      this.apiUrl + action,
      body
    );
  }

  removeOneTask(task: Task): Observable<{ deletedCount: number }> {
    const body = {
      dataSource: this.data_source,
      database: this.database,
      collection: this.collection,

      filter: { _id: { $oid: task._id } },
    };
    const action = '/action/deleteOne';

    return this.http.post<{ deletedCount: number }>(this.apiUrl + action, body);
  }
}
