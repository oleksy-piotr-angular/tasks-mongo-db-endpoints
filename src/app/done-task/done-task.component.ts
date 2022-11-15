import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css'],
})
export class DoneTaskComponent implements OnInit {
  tasksDone: Array<Task> = [];
  constructor(private tasksService: TasksService) {
    this.tasksService.getTaskDoneObs().subscribe((tasks: Array<Task>) => {
      this.tasksDone = tasks; //after subsribing actual state of 'tasksDone' Array<string> from TasksService we assign it to internal variable 'taksDone' intead Using @Input() (property-binding) as below(we don't neeed to pass data from Parent because Everything is in 'TasksService'):
    });
  }

  /* /*  @Input()
  tasksDone: Array<Task> = []; */

  ngOnInit(): void {}
}
