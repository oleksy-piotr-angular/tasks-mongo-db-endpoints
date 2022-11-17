import { Task } from './../models/task';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
})
export class TodoTaskComponent implements OnInit {
  tasksList: Array<Task> = [];
  constructor(private tasksService: TasksService) {
    this.tasksService.getTaskListObs().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks; //after subsribing actual state of 'tasksList' Array<string> from TasksService we assign it to internal variable 'taksList' intead Using @Input() (property-binding) as below(we don't neeed to pass data from Parent because Everything is in 'TasksService'):
    });
  } // Inject tasksService to use everything through TasksService method without EventEmiter(Event-Biding)and Properties(Property-Binding) like was below:
  /* @Input() //this decorator allow to receive data from Parent Component to 'tasksList'
  tasksList: Array<string> = []; //used in selector as a property in AppComponent
  @Output()
  emitDone = new EventEmitter<string>(); //used in selector as a event in AppComponent
  @Output()
  emitRemove = new EventEmitter<string>(); //used in selector as a event in AppComponent */

  ngOnInit(): void {}
  remove(task: Task) {
    this.tasksService.remove(task); //we used Service method instead EventEmiter-emitRemove(event-binding) below:
    /* //if we select data to be removed  'emit/send' we emi that data from the todo-task.component to the method from Parent by executing this method(look at todo-task.component.html)
    this.emitRemove.emit(task); //emit up to Parent AppComponent */
  }
  done(task: Task) {
    task.end = new Date(); //we have to set Date 'end' before we pass this 'task' variable to method below
    this.tasksService.done(task); //we used Service method instead EventEmiter-emitDone(event-binding) below:
    /* //we 'emit/send' the data to be done from the todo-task.component to the method from Parent by executing this method(look at todo-task.component.html)
    this.emitDone.emit(task); //emit up to Parent AppComponent */
  }

  getColor(): string {
    return this.tasksList.length >= 5 ? 'red' : 'green'; // 'ternary conditional operator' to return color
  }
}
