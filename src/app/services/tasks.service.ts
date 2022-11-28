import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task'; // it must be if we use Interface <Task>

@Injectable()
export class TasksService {
  //everything was moved from 'app.component.ts' component to this 'Service'. TasksService has variables/fields/Arrays below and execute all operations on them but all events receives from child-components|child component deal with the display of data and receiveing tasks but not execute any operations

  private tasksList: Array<Task> = []; // access to this Component only|replacing <string> with <Task> interface|
  private tasksDone: Array<Task> = []; // access to this Component only|replacing <string> with <Task> interface|
  private tasksListObs = new BehaviorSubject<Array<Task>>( //|replacing <string> with <Task> interface|
    []
  ); /*  Here BehaviorSubject was created to prepare to observe changes in TasksList[] */
  private tasksDoneObs = new BehaviorSubject<Array<Task>>( //|replacing <string> with <Task> interface|
    []
  ); /*  Here BehaviorSubject was created to prepare to observe changes in TasksDone[] */
  /* The BehaviorSubject has the characteristic that it stores the “current” value. This means that you can always directly get the last emitted value from the BehaviorSubject. */

  constructor() {
    //above <= changed from "ngOnInit(): void" after move from "app.component.ts"
    this.tasksList = [
      //below replace <string> data with <Task> data(object JS)
      {
        name: 'wash the dishes',
        created: new Date().toLocaleString(),
        isDone: false,
      },
      {
        name: 'vacuuming the floor',
        created: new Date().toLocaleString(),
        isDone: false,
      },
      {
        name: 'cook a meal',
        created: new Date().toLocaleString(),
        isDone: false,
      },
      {
        name: 'water the flowers',
        created: new Date().toLocaleString(),
        isDone: false,
      },
      /** above we change Date() into string and add property "isDOne" to send data to MongoDB Data Storage */
    ];
    this.tasksListObs.next(this.tasksList); // 'this.tasksList' will be emited to subsribers
  }

  add(task: Task): void {
    //above replace <string> data with <Task> data(object JS)
    this.tasksList.push(task); //This method add task which received from 'task' parameter
    this.tasksListObs.next(this.tasksList); //tasksList was updated above so we emit here its actual content to subsribers
  }
  remove(task: Task) {
    //above replace <string> data with <Task> data(object JS)
    /* when we declare a method we need to remember to set apropriate type in parameters*/
    this.tasksList = this.tasksList.filter((e) => e != task); //'filter' method return new array with elements other than 'task' parameter|we assign returned array to existing variable 'taskList in Component
    this.tasksListObs.next(this.tasksList); //tasksList was removed above so we emit here its actual content to subsribers
  }
  done(task: Task) {
    //above replace <string> data with <Task> data(object JS)
    /* when we declare a method we need to remember to set apropriate type in parameters*/
    this.tasksDone.push(task); //add task to a new Array 'tasksDone'
    this.remove(task); //remove this task from 'tasksList' with method above
    this.tasksDoneObs.next(this.tasksDone); //tasksDone was updated above so we emit here its actual content to subsribers
  }

  getTaskListObs(): Observable<Array<Task>> {
    //above replace <string> data with <Task> data(object JS)
    return this.tasksListObs.asObservable(); /* After Invoke this method we Create 'Observable' with the subject */
  }
  getTaskDoneObs(): Observable<Array<Task>> {
    //above replace <string> data with <Task> data(object JS)
    return this.tasksDoneObs.asObservable(); /* After Invoke this method we Create 'Observable' with the subject */
  }
}
