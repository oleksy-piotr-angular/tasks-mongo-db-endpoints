import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TasksService } from './services/TaskService/tasks.service';
import { HttpService } from './services/HttpService/http.service';
import { FormsModule } from '@angular/forms';
import {
  MockAddTaskComponent,
  MockCheckedDirective,
  MockDateDirective,
  MockDoneTaskComponent,
  MockHttpService,
  MockSortNamePipe,
  MockTodoTaskComponent,
  MockTransformTaskPipe,
} from './shared/testKit/mockDependencies';

xdescribe('AppComponent', () => {
  describe('Isolated Unit Testing', () => {
    let mockTaskService: jasmine.SpyObj<TasksService>;
    beforeEach(async () => {
      mockTaskService = jasmine.createSpyObj('TaskService', ['add']);
      await TestBed.configureTestingModule({
    declarations: [MockAddTaskComponent,
        MockTodoTaskComponent,
        MockDoneTaskComponent,
        MockCheckedDirective,
        MockDateDirective,
        MockTransformTaskPipe,
        MockSortNamePipe,],
    providers: [
        { provide: TasksService, useValue: mockTaskService },
        { provide: HttpService, useClass: MockHttpService },
    ],
    imports: [HttpClientTestingModule, FormsModule, AppComponent],
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
