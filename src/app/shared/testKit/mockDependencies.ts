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
  template: ` <div></div> `,
})
export class MockDoneTaskComponent {}
@Component({
  selector: 'app-todo-task',
  template: ``,
})
export class MockTodoTaskComponent {}

export class MockHttpService {}
