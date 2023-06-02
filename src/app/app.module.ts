import { HttpClientModule } from '@angular/common/http';
//FormsModule-TwoWayBinding and Bootstrap Working;
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//We need to import all created app Elements here to use them
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { CheckedDirective } from './shared/checked.directive';
import { DateDirective } from './shared/date.directive';
import { TransformTaskPipe } from './shared/transform-task.pipe';
import { SortNamePipe } from './shared/sort-name.pipe';
import { HttpService } from './services/http.service';
import { TasksService } from './services/tasks.service';

@NgModule({
  declarations: [
    //we need to declare all created elements here for all components
    AppComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    DateDirective,
    TransformTaskPipe,
    SortNamePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule /* FormsModule-TwoWayBinding */,
    HttpClientModule /**if we want to use HTTP request we must Import this module  */,
  ],
  providers: [TasksService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
