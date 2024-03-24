import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTaskComponent } from './todo-task.component';
import { TasksService } from '../services/TaskService/tasks.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '../services/HttpService/http.service';
import { SortNamePipe } from '../shared/pipes/SortName/sort-name.pipe';
import { TransformTaskPipe } from '../shared/pipes/TransformTask/transform-task.pipe';
import { DateDirective } from '../shared/directives/Date/date.directive';

describe('TodoTaskComponent', () => {
  let component: TodoTaskComponent;
  let fixture: ComponentFixture<TodoTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoTaskComponent,
        SortNamePipe,
        TransformTaskPipe,
        DateDirective,
      ],
      providers: [TasksService, HttpService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
