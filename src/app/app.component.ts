import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) ';

  constructor(private taskService: TasksService) {}

  // Below this method we do not need because all changes are saving when something changed in App
  /*  save() {
    this.taskService.saveTaskInDB();
  } */
  clear() {
    // we use this method to clear all Tasks which was done from DB
    this.taskService.clearDoneTasksInDB();
  }
}
