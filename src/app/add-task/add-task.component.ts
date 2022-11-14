import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  newTask: string = '';

  constructor(private tasksService: TasksService) {} // Inject tasksService to use everything through TasksService method without EventEmiter(Event-Biding) like was below:
  /* tasksList: Array<string> = [];
  @Output()
  emitTask = new EventEmitter<string>(); */

  ngOnInit(): void {}
  add() {
    this.tasksService.add(this.newTask); //Invoke method from 'TasksService' Instead emiting this variable to 'AppComponent'(Parent).Below code with EventEmiter Use:
    /* this.emitTask.emit(this.newTask); //Emit data with EventEmitter to send data from Child to Parent|after handling method 'add()' with (click) event we make event (emitTask[@Output]) to handle another method form Parent Component */
    this.newTask = ''; //clean text field after data 'newTask' emiting
  }
}
