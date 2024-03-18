import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/TaskService/tasks.service';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
})
export class DoneTaskComponent implements OnInit {
  tasksDone: Task[] = [];
  tasksExists = false;
  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
    this.tasksService.getTaskListObs().subscribe((tasks: Task[]) => {
      this.tasksDone = tasks.filter((t) => t.isDone === true);
      this.tasksExists = tasks.length > 0 ? true : false;
    });
  }
}
