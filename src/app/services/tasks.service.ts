import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task'; // it must be if we use Interface <Task>
import { HttpService } from './http.service';

@Injectable()
export class TasksService {
  private tasksListObs = new BehaviorSubject<Array<Task>>([]);

  constructor(private httpService: HttpService) {
    this.getTasksFromDB();
  }

  add(task: Task): void {
    // we return all values from 'Observable' and put them into this const variable
    const list: Task[] = this.tasksListObs.getValue();
    // add new element from this methods parameter
    list.push(task);
    // propagate new 'list' in 'Observable' with 'next()' method
    this.tasksListObs.next(list);
    //this method saving changes in MongoDB data Storage
    this.saveOneTaskInDB(task);
    // need to update all elements  and get an '_id' assigned in MongoDB storage
    this.getTasksFromDB();
  }
  remove(task: Task) {
    //'filter' method return new array with elements other than 'task' parameter
    const tasksList = this.tasksListObs.getValue().filter((e) => e != task);
    //tasksList was removed above so we emit here its actual content to subscribers
    this.tasksListObs.next(tasksList);
    // when we remove some Task in App we also remove it from MongoDB
    this.removeOneTaskInDB(task);
  }
  done(task: Task) {
    //change 'Date' into String if we want to Send data appropriate with MongoDB settings
    task.end = new Date().toLocaleString();
    task.isDone = true;
    // we return all values and put them into this const variable
    const list = this.tasksListObs.getValue();
    this.tasksListObs.next(list);
    //this method saving changes in MongoDB data Storage
    this.updateOneTaskInDB(task);
  }

  getTaskListObs(): Observable<Array<Task>> {
    /* After Invoke this method we Create 'Observable' with the 'Subject' */
    return this.tasksListObs.asObservable();
  }

  saveOneTaskInDB(task: Task) {
    this.httpService.saveOneTask(task);
  }
  updateOneTaskInDB(task: Task) {
    this.httpService.updateOneTaskToDone(task);
  }
  clearDoneTasksInDB() {
    this.httpService.removeDoneTasksFromDB();
    //refresh data from DB
    this.getTasksFromDB();
  }
  removeOneTaskInDB(task: Task) {
    this.httpService.removeOneTask(task);
  }
  getTasksFromDB() {
    this.httpService.getTasks().subscribe((tasks) => {
      // because after request we receive object as an answer, we need to change values into Array
      const requestToArray = Object.values(tasks);
      // this Array element is an object which keeps nested Array with tasksList[] of Type 'Task' | need to change to another array by 'Object.values()' -> Task[]
      const listOfTasks: Task[] = Object.values(requestToArray[0]);
      this.tasksListObs.next(listOfTasks);
    });
  }
}
