import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';
import { HttpService } from './http.service';

@Injectable()
export class TasksService {
  private tasksList$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private httpService: HttpService) {
    this.getTasksFromDB();
  }

  add(task: Task): void {
    //this method saving changes in MongoDB data Storage and set new Id from MOngoDB
    this.httpService.saveOneTask(task).subscribe((data) => {
      task._id = data.insertedId;
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
      console.log(response.deletedCount);
    });
  }
  done(task: Task) {
    task.end = new Date().toLocaleString();
    task.isDone = true;
    this.httpService.updateOneTaskToDone(task).subscribe((response) => {
      const list = [...this.tasksList$.getValue()];
      this.tasksList$.next(list);
      console.log('Number of updated tasks: ');
      console.log(response.modifiedCount);
    });
  }

  getTaskListObs(): Observable<Array<Task>> {
    /* After Invoke this method we Create 'Observable' with the 'Subject' */
    return this.tasksList$.asObservable();
  }

  private getTasksFromDB() {
    this.httpService.getTasks().subscribe((tasks) => {
      // because after request we receive object as an answer, we need to change values into Array
      const requestToArray = Object.values(tasks);
      // this Array element is an object which keeps nested Array with tasksList[] of Type 'Task' | need to change to another array by 'Object.values()' -> Task[]
      const listOfTasks: Task[] = Object.values(requestToArray[0]);
      this.tasksList$.next(listOfTasks);
    });
  }
}
