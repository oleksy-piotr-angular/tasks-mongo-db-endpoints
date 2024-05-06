import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../../models/task';
import { TasksService } from '../../services/TaskService/tasks.service';
import { SortNamePipe } from '../../shared/pipes/SortName/sort-name.pipe';
import { TransformTaskPipe } from '../../shared/pipes/TransformTask/transform-task.pipe';
import { DateDirective } from '../../shared/directives/Date/date.directive';
import { CheckedDirective } from '../../shared/directives/Checked/checked.directive';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CheckedDirective,
    DateDirective,
    TransformTaskPipe,
    SortNamePipe,
    AsyncPipe,
  ],
})
export class DoneTaskComponent implements OnInit {
  tasksDone$?: Observable<Task[]>;
  tasksExists$?: Observable<boolean>;
  private tasksService = inject(TasksService);
  ngOnInit(): void {
    this.tasksDone$ = this.tasksService
      .getTaskList$()
      .pipe(map((tasks) => tasks.filter((task) => task.isDone === true)));
    this.tasksExists$ = this.tasksService.getIsTaskStatus();
  }
}
