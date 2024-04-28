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
import { Observable, Subscription } from 'rxjs';
import { NotifyModalComponent } from './components/notify-modal/notify-modal.component';
import { LoadingSpinner } from './components/loading-spinner/loading-spinner-loading-spinner.component';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    LoadingSpinner,
    NgIf,
    AsyncPipe,
  ],
})
export class AppComponent implements OnInit {
  title = 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) ';
  private tasksService = inject(TasksService);
  closeErrorSub!: Subscription;
  @ViewChild('appPlaceHolder', { read: ViewContainerRef })
  componentHost!: ViewContainerRef;
  isLoading$?: Observable<boolean>;
  completedExists$?: Observable<boolean>;

  ngOnInit(): void {
    this.tasksService.getErrorMessage().subscribe((error) => {
      if (error) {
        this.showErrorAlert(error);
      }
    });
    this.isLoading$ = this.tasksService.getLoadingStatus();
    this.completedExists$ = this.tasksService.getCompletedStatus();
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
