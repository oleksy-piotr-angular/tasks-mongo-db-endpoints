import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // this component has variables/fields/Arrays below and execute all operations on them but all events receives from child-components|child component deal with the display of data and receiveing tasks but not execute any operations
  title = 'Tasks-list-example2';
  tasksList: Array<string> = [];
  tasksDone: Array<string> = [];

  add(task: string): void {
    this.tasksList.push(task); //This method add task which received from 'task' parameter
  }
  remove(task: string) {
    /* when we declare a method we need to remember to set apropriate type in parameters*/
    this.tasksList = this.tasksList.filter((e) => e != task); //'filter' method return new array with elements other than 'task' parameter|we assign returned array to existing variable 'taskList in Component
  }
  done(task: string) {
    /* when we declare a method we need to remember to set apropriate type in parameters*/
    this.tasksDone.push(task); //add task to a new Array 'tasksDone'
    this.remove(task); //remove this task from 'tasksList' with method above
  }
}
