import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { Task } from '../../models/task';
import { TasksService } from '../../services/TaskService/tasks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class AddTaskComponent {
  newTask: string = '';
  private tasksService = inject(TasksService);
  @ViewChild('inputTask') set input(el: ElementRef<HTMLInputElement>) {
    if (el) {
      el.nativeElement.focus();
    }
  }

  add() {
    const task: Task = {
      name: this.newTask,
      created: new Date().toLocaleString(),
      isDone: false,
    };
    this.tasksService.add(task);

    this.newTask = '';
  }
}
