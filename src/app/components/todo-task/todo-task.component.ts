import { Task } from './../../models/task';
import { Component, OnInit, inject } from '@angular/core';
import { TasksService } from '../../services/TaskService/tasks.service';
import { SortNamePipe } from '../../shared/pipes/SortName/sort-name.pipe';
import { TransformTaskPipe } from '../../shared/pipes/TransformTask/transform-task.pipe';
import { DateDirective } from '../../shared/directives/Date/date.directive';
import { NgIf, NgStyle, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

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
    AsyncPipe,
  ],
})
export class TodoTaskComponent implements OnInit {
  tasksTodo$?: Observable<Task[]>;
  tasksExists$?: Observable<boolean>;
  private tasksService = inject(TasksService);
  ngOnInit(): void {
    this.tasksTodo$ = this.tasksService
      .getTaskList$()
      .pipe(map((tasks) => tasks.filter((task) => task.isDone === false)));
    this.tasksExists$ = this.tasksService.getIsTaskStatus();
  }
  remove(task: Task) {
    this.tasksService.remove(task);
  }
  done(task: Task) {
    this.tasksService.done(task);
  }

  setColor(): string {
    let color = '';
    this.tasksTodo$?.subscribe(
      (tasks) => (color = tasks.length >= 5 ? 'red' : 'green')
    );
    return color;
  }
}
