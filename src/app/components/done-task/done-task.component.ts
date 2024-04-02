import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../../models/task';
import { TasksService } from '../../services/TaskService/tasks.service';
import { SortNamePipe } from '../../shared/pipes/SortName/sort-name.pipe';
import { TransformTaskPipe } from '../../shared/pipes/TransformTask/transform-task.pipe';
import { DateDirective } from '../../shared/directives/Date/date.directive';
import { CheckedDirective } from '../../shared/directives/Checked/checked.directive';
import { NgIf, NgFor } from '@angular/common';

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
  ],
})
export class DoneTaskComponent implements OnInit {
  tasksDone: Task[] = [];
  tasksExists = false;
  private tasksService = inject(TasksService);
  ngOnInit(): void {
    this.tasksService.getTaskList$().subscribe((tasks: Task[]) => {
      this.tasksDone = tasks.filter((t) => t.isDone === true);
      this.tasksExists = tasks.length > 0 ? true : false;
    });
  }
}
