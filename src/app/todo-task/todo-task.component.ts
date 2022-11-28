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
      this.tasksList = tasks
        .filter(
          (t) => t.isDone === false
        ) /**this filter method recieve Array where 'isDone' = false(Boolean_flag) and return whole Array to local 'this.taskList'*/
        .slice(); //1. after subsribing actual state of 'tasksList' Array<string> from TasksService we assign it to internal variable 'taksList' instead Using @Input() (property-binding) as below(we don't neeed to pass data from Parent because Everything is in 'TasksService'):
      //2. 'tasks' we receive from Service but Angular cannot detect if something in 'taskList' appeared (new element) because new element is added only to Service 'tasks' - thats why sortName Pipe on tasksList not work properly|Angular checks if tasksList has new reference (new Array) but we have same reference 'tasks' all the time. Thats why we use slice() method to return a new Copy of Array reference (return new reference of 'tasks'<Array> from service) and Angular detect that new Array(new reference of Array) is here and sortName Pipe will be invoke properly after adding new element to list through TasksService
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
    this.tasksService.done(task); //we used Service method instead EventEmiter-emitDone(event-binding) below:
    /* //we 'emit/send' the data to be done from the todo-task.component to the method from Parent by executing this method(look at todo-task.component.html)
    this.emitDone.emit(task); //emit up to Parent AppComponent */
  }

  getColor(): string {
    return this.tasksList.length >= 5 ? 'red' : 'green'; // 'ternary conditional operator' to return color
  }
}
