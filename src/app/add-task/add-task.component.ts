import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  newTask: string = '';
  tasksList: Array<string> = [];
  @Output()
  emitTask = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
  add() {
    this.emitTask.emit(this.newTask); //Emit data with EventEmitter to send data from Child to Parent|after handling method 'add()' with (click) event we make event (emitTask[@Output]) to handle another method form Parent Component
    this.newTask = ''; //clean text field after data 'newTask' emiting
  }
}
