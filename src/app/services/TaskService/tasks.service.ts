import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, ErrorNotification, Observable, Subject } from 'rxjs';
import { Task } from '../../models/task';
import { HttpService } from '../HttpService/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TasksService {
  private tasksList$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private httpService = inject(HttpService);
  private errorMessage: Subject<Error | null> = new Subject();

  constructor() {
    this.getTasksFromDB();
  }

  add(task: Task): void {
    if (task.name.length < 5) {
      this.setNewError(
        'Name value is too short..',
        'Name value must be greater than 5 characters!'
      );
      return;
    }
    this.httpService.saveOneTask(task).subscribe({
      next: (data) => {
        task._id = data._id;
        const list: Task[] = [...this.tasksList$.getValue()];
        list.push(task);
        this.tasksList$.next(list);
        this.errorMessage.next(null);
      },
      error: (err: HttpErrorResponse) => {
        this.setNewError(err.name, err.error);
      },
    });
  }
  remove(task: Task) {
    this.httpService.removeOneTask(task).subscribe({
      next: (response) => {
        const list: Task[] = this.tasksList$
          .getValue()
          .filter((e) => e != task);
        this.tasksList$.next(list);
        this.errorMessage.next(null);
      },
      error: (err: HttpErrorResponse) => {
        this.setNewError(err.name, err.error);
      },
    });
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    this.httpService.updateOneTaskToDone(task).subscribe({
      next: (response) => {
        const list = [...this.tasksList$.getValue()];
        this.tasksList$.next(list);
        this.errorMessage.next(null);
      },
      error: (err: HttpErrorResponse) => {
        this.setNewError(err.name, err.error);
      },
    });
  }

  getTaskList$(): Observable<Task[]> {
    return this.tasksList$.asObservable();
  }

  getErrorMessage(): Observable<{
    message: string;
    name: string;
  } | null> {
    return this.errorMessage.asObservable();
  }

  clearDoneTasksInDB() {
    this.httpService.removeDoneTasksFromDB().subscribe({
      next: (response) => {
        const list = this.tasksList$
          .getValue()
          .filter((t) => t.isDone === false);
        this.tasksList$.next(list);
        this.errorMessage.next(null);
      },
      error: (err: HttpErrorResponse) => {
        this.setNewError(err.name, err.error);
      },
    });
  }
  private getTasksFromDB() {
    this.httpService.getTasks().subscribe({
      next: (response) => {
        this.tasksList$.next(response.documents);
        this.errorMessage.next(null);
      },
      error: (err: HttpErrorResponse) => {
        this.setNewError(err.name, err.error);
      },
    });
  }

  private setNewError(_name: string, _message: string) {
    this.errorMessage.next({
      name: _name,
      message: typeof _message === 'string' ? _message : 'Unknown Error',
    });
  }
}
