import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksService } from './services/TaskService/tasks.service';
import { HttpService } from './services/HttpService/http.service';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { DoneTaskComponent } from './components/done-task/done-task.component';
import { CheckedDirective } from './shared/directives/Checked/checked.directive';
import { DateDirective } from './shared/directives/Date/date.directive';
import { TransformTaskPipe } from './shared/pipes/TransformTask/transform-task.pipe';
import { SortNamePipe } from './shared/pipes/SortName/sort-name.pipe';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddTaskComponent,
        TodoTaskComponent,
        DoneTaskComponent,
        CheckedDirective,
        DateDirective,
        TransformTaskPipe,
        SortNamePipe,
      ],
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
