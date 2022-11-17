import { TasksService } from './services/tasks.service';
import { FormsModule } from '@angular/forms' /* //FormsModule-TwoWayBinding and Bootstrap Working*/;
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';
import { CheckedDirective } from './shared/checked.directive';
import { DateDirective } from './shared/date.directive';
import { TransformTaskPipe } from './shared/transform-task.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    TodoTaskComponent,
    DoneTaskComponent,
    CheckedDirective,
    DateDirective,
    TransformTaskPipe,
  ],
  imports: [BrowserModule, FormsModule /* FormsModule-TwoWayBinding */],
  providers: [
    TasksService,
  ] /* We need to Inform all Components to about Communication with this Sevice through this table in metadata|we could do that also in AppComponent because all Child Components belongs to Parent| */,
  bootstrap: [AppComponent],
})
export class AppModule {}
