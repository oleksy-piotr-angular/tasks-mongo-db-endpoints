import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../models/task';
import { HttpService } from '../HttpService/http.service';

@Injectable()
export class TasksService {
  private tasksList$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private httpService: HttpService) {
    this.getTasksFromDB();
  }

  add(task: Task): void {
    this.httpService.saveOneTask(task).subscribe((data) => {
      task._id = data._id;
      const list: Task[] = [...this.tasksList$.getValue()];
      list.push(task);
      this.tasksList$.next(list);
      console.log('Task has been saved!');
    });
  }
  remove(task: Task) {
    this.httpService.removeOneTask(task).subscribe((response) => {
      const list: Task[] = this.tasksList$.getValue().filter((e) => e != task);
      this.tasksList$.next(list);
      console.log(response);
    });
  }
  clearDoneTasksInDB() {
    this.httpService.removeDoneTasksFromDB().subscribe((response) => {
      const list = this.tasksList$.getValue().filter((t) => t.isDone === false);
      this.tasksList$.next(list);
      console.log('Number of completed tasks which was removed: ');
      console.log(response);
    });
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    this.httpService.updateOneTaskToDone(task).subscribe((response) => {
      const list = [...this.tasksList$.getValue()];
      this.tasksList$.next(list);
      console.log('Number of updated tasks: ');
      console.log(response);
    });
  }

  getTaskListObs(): Observable<Array<Task>> {
    return this.tasksList$.asObservable();
  }

  private getTasksFromDB() {
    this.httpService.getTasks().subscribe((tasks) => {
      this.tasksList$.next(tasks.documents);
    });
  }
}
