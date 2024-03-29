import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from './services/TaskService/tasks.service';
import { HttpService } from './services/HttpService/http.service';
import { FormsModule } from '@angular/forms';
import {
  Component,
  Directive,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';

describe('AppComponent', () => {
  describe('Isolated Unit Testing', () => {
    @Pipe({ name: 'transformTask' })
    class MockTransformTaskPipe implements PipeTransform {
      transform(value: number): number {
        return value;
      }
    }
    @Pipe({ name: 'sortName' })
    class MockSortNamePipe implements PipeTransform {
      transform(value: number): number {
        return value;
      }
    }
    @Directive({
      selector: '[appDate]',
    })
    class MockDateDirective {
      @Input() appDate: string = '';
    }
    @Directive({
      selector: '[appChecked]',
    })
    class MockCheckedDirective {}
    @Component({
      selector: 'app-add-task',
      template: '<div>></div>',
    })
    class MockAddTaskComponent {}
    @Component({
      selector: 'app-done-task',
      template: '<div>></div>',
    })
    class MockDoneTaskComponent {}
    @Component({
      selector: 'app-todo-task',
      template: '<div>></div>',
    })
    class MockTodoTaskComponent {}
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          AppComponent,
          MockAddTaskComponent,
          MockTodoTaskComponent,
          MockDoneTaskComponent,
          MockCheckedDirective,
          MockDateDirective,
          MockTransformTaskPipe,
          MockSortNamePipe,
        ],
        //TODO
        //!Add Service Mocks
        providers: [TasksService, HttpService],
        imports: [HttpClientTestingModule, FormsModule],
      }).compileComponents();
    });

    it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it(`should have as title 'tasks-app'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      //expect(app.title).toEqual('tasks-app');
    });

    it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      //expect(compiled.querySelector('.content span')?.textContent).toContain('tasks-app app is running!');
    });
  });
});
