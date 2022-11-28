import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task'; // it must be if we use Interface <Task>

@Injectable()
export class TasksService {
  //everything was moved from 'app.component.ts' component to this 'Service'. TasksService has variables/fields/Arrays below and execute all operations on them but all events receives from child-components|child component deal with the display of data and receiveing tasks but not execute any operations

  private tasksList: Array<Task> = []; // access to this Component only|replacing <string> with <Task> interface|
  private tasksListObs = new BehaviorSubject<Array<Task>>( //|replacing <string> with <Task> interface|
    this.tasksList
  ); /*  Here BehaviorSubject was created to prepare to observe changes in TasksList[] */

  /* The BehaviorSubject has the characteristic that it stores the “current” value. This means that you can always directly get the last emitted value from the BehaviorSubject. */
  /** After Refactoring we could delete "tasksDone"  above because we add BOOLEAN type 'isDone' */

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
      {
        name: 'water the flowers2',
        created: new Date().toLocaleString(),
        end: new Date().toLocaleString(),
        isDone: true,
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
    /* this.tasksDone.push(task); //add task to a new Array 'tasksDone'
    this.remove(task); //remove this task from 'tasksList' with method above
    this.tasksDoneObs.next(this.tasksDone); //tasksDone was updated above so we emit here its actual content to subsribers
    |we don't need this methods above because we change only some properties value in 'Task' as below  and not push elements into 'tasksDone' Array|*/
    task.end =
      new Date().toLocaleString() /** change 'Date' into String if we want to Send data appropriate with MongoDB settings */; //we have to set Date 'end' before we pass this 'task' variable to method below
    task.isDone = true;
    const list = this.tasksListObs.getValue(); // we return all values and put them into this const variable
    this.tasksListObs.next(list); // with method 'next()' we put again all Values from 'list' variable and send info to subscribers that we have new elements in Subject
    /** we do 'const list' because this we cannot inform that some property in Subject was changed we need to again assaign the same list */
  }

  getTaskListObs(): Observable<Array<Task>> {
    //above replace <string> data with <Task> data(object JS)
    return this.tasksListObs.asObservable(); /* After Invoke this method we Create 'Observable' with the subject */
  }

  /** we could remove method 'getTaskDoneObs()' which recieve 'Observable' data from 'tasksDoneObs' */
}
