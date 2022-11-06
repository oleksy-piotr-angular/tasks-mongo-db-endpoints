import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tasks-list-example1';
  newTask: string = '';
  tasksList: Array<string> = [];
  tasksDone: Array<string> = [];

  add() {
    this.tasksList.push(this.newTask); //Two-Way-binded 'newTask' add to tasksList
    this.newTask = ''; //remove added content of 'newTask'
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
