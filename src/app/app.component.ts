import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tasks-list-example3';

  constructor(private taskService: TasksService) {}

  save() {
    this.taskService.saveTaskInDB();
  }
  clear() {
    this.taskService.clearTasksDoneInDB();
  }
}
