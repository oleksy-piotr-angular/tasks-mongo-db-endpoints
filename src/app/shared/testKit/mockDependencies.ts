import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Task } from 'src/app/models/task';

@Pipe({ name: 'transformTask' })
export class MockTransformTaskPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
@Pipe({ name: 'sortName' })
export class MockSortNamePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
@Directive({
  selector: '[appDate]',
})
export class MockDateDirective {
  @Input() appDate: string = '';
}
@Directive({
  selector: '[appChecked]',
})
export class MockCheckedDirective {}
@Component({
  selector: 'app-add-task',
  template: '<div>></div>',
})
export class MockAddTaskComponent {}
@Component({
  selector: 'app-done-task',
  template: `
    <div id="tasksDoneElId" *ngIf="tasksExists">
      <p>Tasks Done {{ tasksDone.length }}:</p>
      <ol>
        <li appChecked *ngFor="let task of tasksDone">
          <div *ngIf="task.end != null">TEST DESCRIPTION...</div>
        </li>
      </ol>
    </div>
  `,
})
export class MockDoneTaskComponent {
  tasksDone: Task[] = [
    {
      name: 'K',
      created: 'someCreatedDate',
      isDone: true,
      end: 'someEndDate',
    },
  ];
  tasksExists = true;
}
@Component({
  selector: 'app-todo-task',
  template: ``,
})
export class MockTodoTaskComponent {}

export class MockHttpService {}
