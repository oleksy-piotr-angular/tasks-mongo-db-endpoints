import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
})
export class TodoTaskComponent implements OnInit {
  @Input() //this decorator allow to receive data from Parent Component to 'tasksList'
  tasksList: Array<string> = []; //used in selector as a property in AppComponent
  @Output()
  emitDone = new EventEmitter<string>(); //used in selector as a event in AppComponent
  @Output()
  emitRemove = new EventEmitter<string>(); //used in selector as a event in AppComponent

  constructor() {}

  ngOnInit(): void {}
  remove(task: string) {
    //if we select data to be removed  'emit/send' we emi that data from the todo-task.component to the method from Parent by executing this method(look at todo-task.component.html)
    this.emitRemove.emit(task); //emit up to Parent AppComponent
  }
  done(task: string) {
    //we 'emit/send' the data to be done from the todo-task.component to the method from Parent by executing this method(look at todo-task.component.html)
    this.emitDone.emit(task); //emit up to Parent AppComponent
  }
}
