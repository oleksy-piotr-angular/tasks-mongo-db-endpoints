import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'transformTask',
  standalone: true,
})
export class MockTransformTaskPipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
@Pipe({
  name: 'sortName',
  standalone: true,
})
export class MockSortNamePipe implements PipeTransform {
  transform(value: number): number {
    return value;
  }
}
@Directive({
  selector: '[appDate]',
  standalone: true,
})
export class MockDateDirective {
  @Input() appDate: string = '';
}
@Directive({
  selector: '[appChecked]',
  standalone: true,
})
export class MockCheckedDirective {}
@Component({
  selector: 'app-add-task',
  template: '<div>></div>',
  standalone: true,
})
export class MockAddTaskComponent {}
@Component({
  selector: 'app-done-task',
  template: ` <div></div> `,
  standalone: true,
})
export class MockDoneTaskComponent {}
@Component({
  selector: 'app-todo-task',
  template: ``,
  standalone: true,
})
export class MockTodoTaskComponent {}

export class MockHttpService {}
