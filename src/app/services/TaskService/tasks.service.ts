import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../models/task';
import { HttpService } from '../HttpService/http.service';

@Injectable()
export class TasksService implements OnInit {
  private tasksList$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getTasksFromDB();
  }

  add(task: Task): void {
    this.httpService.saveOneTask(task).subscribe((data) => {
      task._id = data._id;
      const list: Task[] = [...this.tasksList$.getValue()];
      list.push(task);
      this.tasksList$.next(list);
    });
  }
  remove(task: Task) {
    this.httpService.removeOneTask(task).subscribe((response) => {
      const list: Task[] = this.tasksList$.getValue().filter((e) => e != task);
      this.tasksList$.next(list);
    });
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    this.httpService.updateOneTaskToDone(task).subscribe((response) => {
      const list = [...this.tasksList$.getValue()];
      this.tasksList$.next(list);
    });
  }

  getTaskList$(): Observable<Array<Task>> {
    return this.tasksList$.asObservable();
  }

  clearDoneTasksInDB() {
    this.httpService.removeDoneTasksFromDB().subscribe((response) => {
      const list = this.tasksList$.getValue().filter((t) => t.isDone === false);
      this.tasksList$.next(list);
    });
  }
  private getTasksFromDB() {
    this.httpService.getTasks().subscribe((tasks) => {
      this.tasksList$.next(tasks.documents);
    });
  }
}
