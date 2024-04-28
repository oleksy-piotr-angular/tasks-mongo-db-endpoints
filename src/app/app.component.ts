import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TasksService } from './services/TaskService/tasks.service';
import { DoneTaskComponent } from './components/done-task/done-task.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { Subscription } from 'rxjs';
import { NotifyModalComponent } from './components/notify-modal/notify-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [AddTaskComponent, TodoTaskComponent, DoneTaskComponent],
})
export class AppComponent implements OnInit {
  title = 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) ';
  private tasksService = inject(TasksService);
  closeErrorSub!: Subscription;
  @ViewChild('appPlaceHolder', { read: ViewContainerRef })
  componentHost!: ViewContainerRef;

  ngOnInit(): void {
    this.tasksService.getErrorMessage().subscribe((error) => {
      if (error) {
        this.showErrorAlert(error);
      }
    });
  }

  clear() {
    this.tasksService.clearDoneTasksInDB();
  }

  private showErrorAlert(_errorMessage: Error) {
    this.componentHost.clear();
    const alertRef = this.componentHost.createComponent(NotifyModalComponent);
    alertRef.setInput('errorMessage', _errorMessage);
    this.closeErrorSub = alertRef.instance.onCLose.subscribe(() => {
      this.closeErrorSub.unsubscribe();
      this.componentHost.clear();
    });
  }
}
