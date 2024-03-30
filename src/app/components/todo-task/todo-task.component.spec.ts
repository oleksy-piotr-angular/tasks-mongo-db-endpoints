import { TasksService } from 'src/app/services/TaskService/tasks.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTaskComponent } from './todo-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../../services/HttpService/http.service';
import {
  MockDateDirective,
  MockHttpService,
  MockSortNamePipe,
  MockTransformTaskPipe,
} from 'src/app/shared/testKit/mockDependencies';

describe('TodoTaskComponent', () => {
  let component: TodoTaskComponent;
  let fixture: ComponentFixture<TodoTaskComponent>;
  describe('Isolated Unit Testing', () => {
    beforeEach(async () => {
      let taskServiceSpy: jasmine.SpyObj<TasksService>;
      const taskServiceSpyObj = jasmine.createSpyObj(TasksService, [
        'getTaskList$',
      ]);

      await TestBed.configureTestingModule({
        declarations: [
          TodoTaskComponent,
          MockSortNamePipe,
          MockTransformTaskPipe,
          MockDateDirective,
        ],
        providers: [
          { provide: TasksService, useValue: taskServiceSpyObj },
          { provide: HttpService, useClass: MockHttpService },
        ],
        imports: [HttpClientTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TodoTaskComponent);
      component = fixture.componentInstance;
      taskServiceSpy = <jasmine.SpyObj<TasksService>>(
        TestBed.inject(TasksService)
      );
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
