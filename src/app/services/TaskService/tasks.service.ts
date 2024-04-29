import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../../models/task';
import { HttpService } from '../HttpService/http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class TasksService {
  private tasksList$ = new BehaviorSubject<Task[]>([]);
  private httpService = inject(HttpService);
  private errorMessage$: Subject<Error | null> = new Subject();
  private loadingStatus$: Subject<boolean> = new Subject();
  private isCompletedTask$ = new BehaviorSubject<boolean>(false);
  private isTask$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.getTasksFromDB();
  }

  add(task: Task): void {
    this.loadingStatus$.next(true);
    if (task.name.length < 5) {
      this.setNewError(
        'Name value is too short..',
        'Name value must be greater than 5 characters!'
      );
      this.loadingStatus$.next(false);
      return;
    }
    this.httpService.saveOneTask(task).subscribe({
      next: (data) => {
        task._id = data._id;
        const list: Task[] = [...this.tasksList$.getValue()];
        list.push(task);
        this.updateObservables(list, null, false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus$.next(false);
        this.setNewError(err.name, err.error);
      },
    });
  }
  remove(task: Task) {
    this.loadingStatus$.next(true);
    this.httpService.removeOneTask(task).subscribe({
      next: (response) => {
        const list: Task[] = this.tasksList$
          .getValue()
          .filter((e) => e != task);
        this.updateObservables(list, null, false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus$.next(false);
        this.setNewError(err.name, err.error);
      },
    });
  }
  done(task: Task) {
    this.loadingStatus$.next(true);
    task.end = new Date().toLocaleString();
    task.isDone = true;
    this.httpService.updateOneTaskToDone(task).subscribe({
      next: (response) => {
        const list = [...this.tasksList$.getValue()];
        this.updateObservables(list, null, false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus$.next(false);
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
    return this.errorMessage$.asObservable();
  }
  getLoadingStatus() {
    return this.loadingStatus$.asObservable();
  }

  getCompletedStatus() {
    return this.isCompletedTask$.asObservable();
  }
  getIsTaskStatus() {
    return this.isTask$.asObservable();
  }

  clearDoneTasksInDB() {
    this.loadingStatus$.next(true);
    this.httpService.removeDoneTasksFromDB().subscribe({
      next: (response) => {
        const list = this.tasksList$
          .getValue()
          .filter((t) => t.isDone === false);

        this.updateObservables(list, null, false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus$.next(false);
        this.setNewError(err.name, err.error);
      },
    });
  }
  private getTasksFromDB() {
    this.loadingStatus$.next(true);
    this.httpService.getTasks().subscribe({
      next: (response) => {
        console.log(response);
        const areCompleted =
          response.documents.filter((task) => task.isDone === true).length > 0;
        const tasksExist = response.documents.length > 0;
        this.updateObservables(response.documents, null, false);
      },
      error: (err: HttpErrorResponse) => {
        this.loadingStatus$.next(false);
        this.setNewError(err.name, err.error);
      },
    });
  }

  private updateObservables(
    _tasks: Task[],
    _errorMessage: Error | null,
    _isLoading: boolean
  ) {
    const areCompleted =
      _tasks.filter((task) => task.isDone === true).length > 0;
    const tasksExist = _tasks.length > 0;

    this.isCompletedTask$.next(areCompleted);
    this.tasksList$.next(_tasks);
    this.errorMessage$.next(_errorMessage);
    this.loadingStatus$.next(_isLoading);
    this.isTask$.next(tasksExist);
  }

  private setNewError(_name: string, _message: string) {
    this.errorMessage$.next({
      name: _name,
      message: typeof _message === 'string' ? _message : 'Unknown Error',
    });
  }
}
