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
    this.tasksService
      .getTaskListObs() /** we recieve another list here because we remove 'getTasksDoneObs' and add flag 'isDone' into 'Tasks' class/interface to filter list below and show only 'tasksDone' */
      .subscribe((tasks: Array<Task>) => {
        this.tasksDone = tasks
          .filter(
            (t) => t.isDone === true
          ) /**this filter method recieve Array where 'isDone' = true(Boolean_flag) and return whole Array to local 'this.taskDone'*/
          .slice(); //1. after subsribing actual state of 'tasksDone' Array<string> from TasksService we assign it to internal variable 'taksDone' intead Using @Input() (property-binding) as below(we don't neeed to pass data from Parent because Everything is in 'TasksService'):
        //2. 'tasks' we receive from Service but Angular cannot detect if something in 'taskList' appeared (new element) because new element is added only to Service 'tasks' - thats why sortName Pipe on tasksList not work properly|Angular checks if tasksList has new reference (new Array) but we have same reference 'tasks' all the time. Thats why we use slice() method to return a new Copy of Array reference (return new reference of 'tasks'<Array> from service) and Angular detect that new Array(new reference of Array) is here and sortName Pipe will be invoke properly after adding new element to list through TasksService
      });
  }

  /* /*  @Input()
  tasksDone: Array<Task> = []; */

  ngOnInit(): void {}
}
