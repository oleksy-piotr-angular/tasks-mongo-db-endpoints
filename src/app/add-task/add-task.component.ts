import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';
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
    const task: Task = {
      name: this.newTask,
      created:
        new Date().toLocaleString() /** change to String if we want to send data to MongoDB */,
      isDone: false /** add Boolean property as was set in MongoDB */,
    }; //create new object before we add pass to add() method through TasksService and asign 'newTask' from Two-way binded input to name property
    this.tasksService.add(task); //Invoke method from 'TasksService' Instead emiting this variable to 'AppComponent'(Parent).Below code with EventEmiter Use:
    /* this.emitTask.emit(this.newTask); //Emit data with EventEmitter to send data from Child to Parent|after handling method 'add()' with (click) event we make event (emitTask[@Output]) to handle another method form Parent Component */
    this.newTask = ''; //clean text field after data 'newTask' emiting
  }
}
