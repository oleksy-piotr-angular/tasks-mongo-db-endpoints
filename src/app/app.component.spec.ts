import { ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  describe('Isolated Unit Testing', () => {
    let taskServiceSpy: jasmine.SpyObj<TasksService>;
    beforeEach(async () => {
      const taskServiceSpyObj = jasmine.createSpyObj('TaskService', [
        'clearDoneTasksInDB',
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
      it('should call "this.taskService.clearDoneTasksInDB()" to clear the list of completed tasks ', () => {
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
        const buttonDE: DebugElement = divDE.query(By.css('button'));
        const definedText = 'Clear Completed Tasks';

        buttonDE.triggerEventHandler('click');

        expect(
          (<HTMLButtonElement>buttonDE.nativeElement).textContent
        ).toContain(definedText);
        expect(taskServiceSpy.clearDoneTasksInDB).toHaveBeenCalledTimes(1);
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
});
