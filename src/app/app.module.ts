import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { CheckedDirective } from './shared/directives/Checked/checked.directive';
import { DateDirective } from './shared/directives/Date/date.directive';
import { TransformTaskPipe } from './shared/pipes/TransformTask/transform-task.pipe';
import { SortNamePipe } from './shared/pipes/SortName/sort-name.pipe';
import { HttpService } from './services/HttpService/http.service';
import { TasksService } from './services/TaskService/tasks.service';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    DateDirective,
    TransformTaskPipe,
    SortNamePipe,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [TasksService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
