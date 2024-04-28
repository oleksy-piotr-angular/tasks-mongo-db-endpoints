import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../../models/task';
import { HttpService } from '../HttpService/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TasksService {
  private tasksList$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private httpService = inject(HttpService);
  private errorMessage: Subject<Error | null> = new Subject();
  private loadingStatus: Subject<boolean> = new Subject();

  constructor() {
    this.getTasksFromDB();
  }

  add(task: Task): void {
    this.loadingStatus.next(true);
    if (task.name.length < 5) {
      this.setNewError(
        'Name value is too short..',
        'Name value must be greater than 5 characters!'
      );
      this.loadingStatus.next(false);
      return;
    }
    this.httpService.saveOneTask(task).subscribe({
      next: (data) => {
        task._id = data._id;
        const list: Task[] = [...this.tasksList$.getValue()];
        list.push(task);
        this.tasksList$.next(list);
        this.errorMessage.next(null);
        this.loadingStatus.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus.next(false);
        this.setNewError(err.name, err.error);
      },
    });
  }
  remove(task: Task) {
    this.loadingStatus.next(true);
    this.httpService.removeOneTask(task).subscribe({
      next: (response) => {
        const list: Task[] = this.tasksList$
          .getValue()
          .filter((e) => e != task);
        this.tasksList$.next(list);
        this.errorMessage.next(null);
        this.loadingStatus.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus.next(false);
        this.setNewError(err.name, err.error);
      },
    });
  }
  done(task: Task) {
    this.loadingStatus.next(true);
    task.end = new Date().toLocaleString();
    task.isDone = true;
    this.httpService.updateOneTaskToDone(task).subscribe({
      next: (response) => {
        const list = [...this.tasksList$.getValue()];
        this.tasksList$.next(list);
        this.errorMessage.next(null);
        this.loadingStatus.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus.next(false);
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
  getLoadingStatus() {
    return this.loadingStatus.asObservable();
  }

  clearDoneTasksInDB() {
    this.loadingStatus.next(true);
    this.httpService.removeDoneTasksFromDB().subscribe({
      next: (response) => {
        const list = this.tasksList$
          .getValue()
          .filter((t) => t.isDone === false);
        this.tasksList$.next(list);
        this.errorMessage.next(null);
        this.loadingStatus.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus.next(false);
        this.setNewError(err.name, err.error);
      },
    });
  }
  private getTasksFromDB() {
    this.loadingStatus.next(true);
    this.httpService.getTasks().subscribe({
      next: (response) => {
        this.tasksList$.next(response.documents);
        this.errorMessage.next(null);
        this.loadingStatus.next(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus.next(false);
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
