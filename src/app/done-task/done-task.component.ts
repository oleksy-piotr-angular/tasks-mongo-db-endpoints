import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
})
export class DoneTaskComponent {
  tasksDone: Array<Task> = [];
  constructor(private tasksService: TasksService) {
    this.tasksService.getTaskListObs().subscribe((tasks: Array<Task>) => {
      this.tasksDone = tasks.filter((t) => t.isDone === true).slice();
    });
  }
}
