import { Component } from '@angular/core';
import { TasksService } from './services/TaskService/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) ';

  constructor(private taskService: TasksService) {}

  clear() {
    this.taskService.clearDoneTasksInDB();
  }
}
