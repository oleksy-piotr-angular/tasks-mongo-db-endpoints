import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  newTask: string = '';

  constructor(private tasksService: TasksService) {}

  add() {
    const task: Task = {
      name: this.newTask,
      created: new Date().toLocaleString(),
      isDone: false,
    };
    this.tasksService.add(task);

    this.newTask = '';
  }
}
