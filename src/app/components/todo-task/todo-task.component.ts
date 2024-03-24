import { Task } from './../../models/task';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/TaskService/tasks.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
})
export class TodoTaskComponent implements OnInit {
  tasksList: Task[] = [];
  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
    this.tasksService.getTaskListObs().subscribe((tasks: Array<Task>) => {
      this.tasksList = tasks.filter((t) => t.isDone === false);
    });
  }
  remove(task: Task) {
    this.tasksService.remove(task);
  }
  done(task: Task) {
    this.tasksService.done(task);
  }

  getColor(): string {
    return this.tasksList.length >= 5 ? 'red' : 'green';
  }
}
