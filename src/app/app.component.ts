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

  clear() {
    // we use this method to remove from DB all Tasks which was done
    this.taskService.clearDoneTasksInDB();
  }
}
