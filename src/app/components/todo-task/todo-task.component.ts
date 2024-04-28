import { Task } from './../../models/task';
import { Component, OnInit, inject } from '@angular/core';
import { TasksService } from '../../services/TaskService/tasks.service';
import { SortNamePipe } from '../../shared/pipes/SortName/sort-name.pipe';
import { TransformTaskPipe } from '../../shared/pipes/TransformTask/transform-task.pipe';
import { DateDirective } from '../../shared/directives/Date/date.directive';
import { NgIf, NgStyle, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgFor,
    DateDirective,
    NgClass,
    TransformTaskPipe,
    SortNamePipe,
  ],
})
export class TodoTaskComponent implements OnInit {
  tasksList: Task[] = [];
  tasksExists = false;
  private tasksService = inject(TasksService);
  ngOnInit(): void {
    this.tasksService.getTaskList$().subscribe((tasks: Task[]) => {
      this.tasksList = tasks.filter((t) => t.isDone === false);
      this.tasksExists = tasks.length > 0 ? true : false;
    });
  }
  remove(task: Task) {
    this.tasksService.remove(task);
  }
  done(task: Task) {
    this.tasksService.done(task);
  }

  setColor(): string {
    return this.tasksList.length >= 5 ? 'red' : 'green';
  }
}
