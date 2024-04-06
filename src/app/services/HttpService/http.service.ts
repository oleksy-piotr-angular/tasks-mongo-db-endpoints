import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../../models/task';
import { environment } from 'src/environments/environment';
import { API_response } from 'src/app/models/api_response';

@Injectable()
export class HttpService {
  private readonly apiUrl = environment.URL_ENDPOINT;
  private readonly data_source = environment.DATA_SOURCE;
  private readonly database = environment.DATABASE;
  private readonly collection = environment.COLLECTION;
  private http = inject(HttpClient);

  getTasks(): Observable<API_response> {
    const body = {
      dataSource: this.data_source,
      database: this.database,
      collection: this.collection,
    };
    const action = '/action/find';
    return this.http.post<API_response>(this.apiUrl + action, body, {
      responseType: 'json',
    });
  }

  saveOneTask(task: Omit<Task, '_id'>): Observable<Pick<Task, '_id'>> {
    const body = {
      dataSource: this.data_source,
      database: this.database,
      collection: this.collection,
      document: task,
    };
    const action = '/action/insertOne';
    return this.http.post<Pick<Task, '_id'>>(this.apiUrl + action, body);
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
