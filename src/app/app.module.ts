import { FormsModule } from '@angular/forms' /* //FormsModule-TwoWayBinding */;
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';
import { DoneTaskComponent } from './done-task/done-task.component';

@NgModule({
  declarations: [AppComponent, AddTaskComponent, TodoTaskComponent, DoneTaskComponent],
  imports: [BrowserModule, FormsModule /* FormsModule-TwoWayBinding */],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
