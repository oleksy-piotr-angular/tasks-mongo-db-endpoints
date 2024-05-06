import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TasksService } from './services/TaskService/tasks.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DoneTaskComponent } from './components/done-task/done-task.component';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import {
  MockAddTaskComponent,
  MockDoneTaskComponent,
  MockTodoTaskComponent,
} from './shared/testKit/mockDependencies';
import { DebugElement } from '@angular/core';
import { HttpService } from './services/HttpService/http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { dataSAMPLE } from './shared/testKit/testDataSet';
import { Task } from 'src/app/models/task';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  describe('Isolated Unit Tests', () => {
    //TODO
    //!Fix all tests with new "AsyncPipe" functions and such as. Now these specs won't work
    let taskServiceSpy: jasmine.SpyObj<TasksService>;
    beforeEach(async () => {
      const taskServiceSpyObj = jasmine.createSpyObj('TaskService', [
        'clearDoneTasksInDB',
        'getErrorMessage',
      ]);
      await TestBed.configureTestingModule({
        providers: [{ provide: TasksService, useValue: taskServiceSpyObj }],
        imports: [FormsModule, AppComponent],
      })
        .overrideComponent(AppComponent, {
          remove: {
            imports: [AddTaskComponent, TodoTaskComponent, DoneTaskComponent],
          },
          add: {
            imports: [
              MockAddTaskComponent,
              MockTodoTaskComponent,
              MockDoneTaskComponent,
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      taskServiceSpy = <jasmine.SpyObj<TasksService>>(
        TestBed.inject(TasksService)
      );
      taskServiceSpy.getErrorMessage.and.returnValue(of(null));
    });

    it('should create the app', () => {
      expect(component).toBeTruthy();
    });

    it(`should have as title 'Tasks-list-example: Atlas Data API Endpoints(MongoDB) '`, () => {
      expect(component.title).toEqual(
        'Tasks-list-example: Atlas Data API Endpoints(MongoDB) '
      );
    });

    describe('clear()', () => {
      it('should call "taskService.clearDoneTasksInDB()" to clear the list of completed tasks ', () => {
        component.clear();
        expect(taskServiceSpy.clearDoneTasksInDB).toHaveBeenCalledTimes(1);
      });
    });
    describe('Template/ShallowUnitTest', () => {
      let divDE: DebugElement;
      beforeEach(() => {
        fixture.detectChanges();
        divDE = fixture.debugElement.query(By.css('div'));
      });

      it('should render title', () => {
        const h1El: HTMLHeadingElement = divDE.query(
          By.css('h1')
        ).nativeElement;
        expect(h1El.textContent).toContain(
          'Tasks-list-example: Atlas Data API Endpoints(MongoDB) '
        );
      });
      it('should render "button" with defined text and click event for method "clear()"', () => {
        spyOn(component, 'clear');
        const buttonDE: DebugElement = divDE.query(By.css('button'));
        const definedText = 'Clear Completed Tasks';

        buttonDE.triggerEventHandler('click');

        expect(
          (<HTMLButtonElement>buttonDE.nativeElement).textContent
        ).toContain(definedText);
        expect(component.clear).toHaveBeenCalledTimes(1);
      });
      it('should render 2 elements of "div.container" with Mock Child Components ', () => {
        const divEls = divDE.queryAll(By.css('div.container'));
        expect(divEls.length).toBe(2);
        expect(
          divEls[0].query(By.directive(MockAddTaskComponent))
        ).toBeTruthy();
        expect(
          divEls[1].query(By.directive(MockTodoTaskComponent))
        ).toBeTruthy();
        expect(
          divEls[1].query(By.directive(MockDoneTaskComponent))
        ).toBeTruthy();
      });
    });
  });

  describe('Deep Integration Tests', () => {
    let SAMPLE: Task[];
    let httpTestingController: HttpTestingController;
    let taskService: TasksService;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [TasksService, HttpService],
        imports: [AppComponent, HttpClientTestingModule],
      }).compileComponents();

      httpTestingController = TestBed.inject(HttpTestingController);
      taskService = TestBed.inject(TasksService);
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });

    beforeEach(() => {
      SAMPLE = dataSAMPLE;
      httpTestingController
        .expectOne(`${environment.URL_ENDPOINT}/action/find`)
        .flush({ documents: SAMPLE });
      fixture.detectChanges();
    });

    describe('clear()', () => {
      it('should call "taskService.clearDoneTasksInDB()" to clear the list of completed tasks from "tasksList$" ', () => {
        taskService
          .getTaskList$()
          .subscribe((tasks) => {
            expect(tasks.filter((el) => el.isDone === true)).not.toHaveSize(0);
          })
          .unsubscribe();

        component.clear();
        httpTestingController
          .expectOne(environment.URL_ENDPOINT + '/action/deleteMany')
          .flush({ deletedCount: 2 });

        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks.filter((el) => el.isDone === true)).toHaveSize(0);
        });
      });
    });
    describe('Template', () => {
      let divEls: DebugElement[];
      beforeEach(() => {
        divEls = fixture.debugElement.queryAll(By.css('div.container'));
      });

      it('should render 2 elements of "div.container" with Child Components ', () => {
        expect(divEls.length).toBe(2);
        expect(divEls[0].query(By.directive(AddTaskComponent))).toBeTruthy();
        expect(divEls[1].query(By.directive(TodoTaskComponent))).toBeTruthy();
        expect(divEls[1].query(By.directive(DoneTaskComponent))).toBeTruthy();
      });
      it('should render Child Components templates content', () => {
        expect(
          divEls[0]
            .query(By.directive(AddTaskComponent))
            .query(By.css('#addTaskTemplate'))
        ).toBeTruthy();
        expect(
          divEls[1]
            .query(By.directive(TodoTaskComponent))
            .query(By.css('#tasksToDoTemplate'))
        ).toBeTruthy();
        expect(
          divEls[1]
            .query(By.directive(DoneTaskComponent))
            .query(By.css('#tasksDoneTemplate'))
        ).toBeTruthy();
      });
    });
  });
});
