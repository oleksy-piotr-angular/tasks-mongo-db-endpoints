import { FormsModule } from '@angular/forms' /* //FormsModule-TwoWayBinding */;
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';

@NgModule({
  declarations: [AppComponent, AddTaskComponent],
  imports: [BrowserModule, FormsModule /* FormsModule-TwoWayBinding */],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
