import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoneTaskComponent } from './done-task.component';
import { TasksService } from '../../services/TaskService/tasks.service';
import { HttpService } from '../../services/HttpService/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Task } from 'src/app/models/task';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
  MockCheckedDirective,
  MockDateDirective,
  MockHttpService,
  MockSortNamePipe,
  MockTransformTaskPipe,
} from 'src/app/shared/testKit/mockDependencies';
import { dataSAMPLE } from 'src/app/shared/testKit/testDataSet';
describe('DoneTaskComponent', () => {
  let fixture: ComponentFixture<DoneTaskComponent>;
  let component: DoneTaskComponent;
  let SAMPLE: Task[];

  beforeEach(() => {
    SAMPLE = dataSAMPLE;
  });

  describe('Isolated Unit Testing', () => {
    let taskServiceSpy: jasmine.SpyObj<TasksService>;
    const taskServiceSpyObj = jasmine.createSpyObj(TasksService, [
      'getTaskList$',
    ]);

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          DoneTaskComponent,
          MockSortNamePipe,
          MockTransformTaskPipe,
          MockDateDirective,
          MockCheckedDirective,
        ],
        providers: [
          { provide: TasksService, useValue: taskServiceSpyObj },
          { provide: HttpService, useClass: MockHttpService },
        ],
        imports: [HttpClientTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(DoneTaskComponent);
      component = fixture.componentInstance;
      taskServiceSpy = <jasmine.SpyObj<TasksService>>(
        TestBed.inject(TasksService)
      );
    });

    it('should create Component Instance', () => {
      expect(component).toBeTruthy();
    });
    describe('Template', () => {
      describe('Tasks Not Exist', () => {
        it('should not render div "#tasksDoneElId" if Tasks Behavior Subject has no Elements', () => {
          taskServiceSpy.getTaskList$.and.returnValue(of([]));
          fixture.detectChanges();
          const divDE: DebugElement = fixture.debugElement.query(
            By.css('#tasksDoneElId')
          );
          expect(component.tasksExists).toBeFalse();
          expect(divDE).toBeFalsy();
        });
      });
      describe('Tasks Exist', () => {
        beforeEach(() => {
          taskServiceSpy.getTaskList$.and.returnValue(of(SAMPLE));
          fixture.detectChanges();
        });
        it('should render div "#tasksDoneElId" if Tasks Behavior Subject has Elements', () => {
          const divEl: HTMLDivElement = fixture.debugElement.query(
            By.css('#tasksDoneElId')
          ).nativeElement;
          expect(component.tasksExists).toBeTrue();
          expect(divEl).toBeTruthy();
        });
        it('should render Paragraph Element with info about number of Completed Tasks', () => {
          const pEl: HTMLParagraphElement = fixture.debugElement.query(
            By.css('#tasksDoneElId p')
          ).nativeElement;
          expect(pEl).toBeTruthy();
          expect(pEl.textContent).toBe(
            `Tasks Done ${component.tasksDone.length}:`
          );
        });
        it('should render <ol> with the same number of <li> elements as the number of completed tasks', () => {
          const olDE: DebugElement = fixture.debugElement.query(
            By.css('#tasksDoneElId ol')
          );
          expect(olDE).toBeTruthy();
          const liDEs: DebugElement[] = olDE.queryAll(By.css('li'));
          expect(liDEs.length).toBe(component.tasksDone.length);
        });
        it('in <li >should render <div> with name property content of tasks if "task" has "end" property which is used in [appDate] pipe', () => {
          const divDEs: DebugElement[] = fixture.debugElement.queryAll(
            By.css('#tasksDoneElId>ol>li>div')
          );
          const doneTasks = component.tasksDone;
          const elAmount = doneTasks.length;
          for (let i = 0; i < elAmount; i++) {
            const divEl: HTMLDivElement = divDEs[i].nativeElement;
            const task: Task = doneTasks[i];
            expect(divEl).toBeTruthy();
            if (task.end) {
              expect(divEl.textContent).toBe(` ${task.name} `);
            } else {
              expect(task.end).toBeTruthy();
            }
          }
        });
      });
    });
    describe('ngOnInit()', () => {
      it('should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskListObs()"', () => {
        taskServiceSpy.getTaskList$.and.returnValue(of(SAMPLE));
        component.ngOnInit();
        expect(component.tasksDone.length).toBe(2);
      });
    });
    afterEach(() => {
      taskServiceSpy.getTaskList$.and.returnValue(of([]));
    });
  });
});
