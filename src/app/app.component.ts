import { Component, inject } from '@angular/core';
import { TasksService } from './services/TaskService/tasks.service';
import { DoneTaskComponent } from './components/done-task/done-task.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [AddTaskComponent, TodoTaskComponent, DoneTaskComponent],
})
export class AppComponent {
  title = 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) ';
  private taskService = inject(TasksService);

  clear() {
    this.taskService.clearDoneTasksInDB();
  }
}
