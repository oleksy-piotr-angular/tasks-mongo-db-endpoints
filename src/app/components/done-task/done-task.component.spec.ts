import {
  MockDateDirective,
  MockSortNamePipe,
  MockTransformTaskPipe,
} from './../../shared/testKit/mockDependencies';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoneTaskComponent } from './done-task.component';
import { TasksService } from '../../services/TaskService/tasks.service';
import { Task } from 'src/app/models/task';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { dataSAMPLE } from 'src/app/shared/testKit/testDataSet';
import { CheckedDirective } from 'src/app/shared/directives/Checked/checked.directive';
import { DateDirective } from 'src/app/shared/directives/Date/date.directive';
import { TransformTaskPipe } from 'src/app/shared/pipes/TransformTask/transform-task.pipe';
import { SortNamePipe } from 'src/app/shared/pipes/SortName/sort-name.pipe';
import { MockCheckedDirective } from 'src/app/shared/testKit/mockDependencies';
import { HttpService } from 'src/app/services/HttpService/http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
describe('DoneTaskComponent', () => {
  let fixture: ComponentFixture<DoneTaskComponent>;
  let component: DoneTaskComponent;
  let SAMPLE: Task[];

  beforeEach(() => {
    SAMPLE = dataSAMPLE;
  });

  describe('Isolated Unit Tests', () => {
    let taskServiceSpy: jasmine.SpyObj<TasksService>;
    const taskServiceSpyObj = jasmine.createSpyObj(TasksService, [
      'getTaskList$',
    ]);

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [{ provide: TasksService, useValue: taskServiceSpyObj }],
        imports: [DoneTaskComponent],
      })
        .overrideComponent(DoneTaskComponent, {
          remove: {
            imports: [
              CheckedDirective,
              DateDirective,
              TransformTaskPipe,
              SortNamePipe,
            ],
          },
          add: {
            imports: [
              MockCheckedDirective,
              MockDateDirective,
              MockTransformTaskPipe,
              MockSortNamePipe,
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(DoneTaskComponent);
      component = fixture.componentInstance;
      taskServiceSpy = <jasmine.SpyObj<TasksService>>(
        TestBed.inject(TasksService)
      );
    });

    it('should create Component Instance', () => {
      expect(component).toBeTruthy();
    });
    it('should be init with empty Array of "tasksDone" property', () => {
      expect(component.tasksDone).toEqual([]);
    });
    it('should be init with false value for "tasksExist" property', () => {
      expect(component.tasksExists).toBeFalse();
    });
    describe('ngOnInit()', () => {
      it('should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"', () => {
        taskServiceSpy.getTaskList$.and.returnValue(of(SAMPLE));
        component.ngOnInit();
        const filteredTasks = SAMPLE.filter((el) => el.isDone === true);
        expect(component.tasksDone).toEqual(filteredTasks);
        expect(component.tasksExists).toBeTrue();
      });
    });
    describe('Template/ShallowUnitTest', () => {
      describe('Tasks Not Exist', () => {
        it('should not render div "#tasksDoneTemplate" if Tasks Behavior Subject has no Elements', () => {
          taskServiceSpy.getTaskList$.and.returnValue(of([]));
          fixture.detectChanges();
          const divDE: DebugElement = fixture.debugElement.query(
            By.css('#tasksDoneTemplate')
          );
          expect(component.tasksExists).toBeFalse();
          expect(divDE).toBeFalsy();
        });
      });
      describe('Tasks Exist', () => {
        let divDE: DebugElement;
        beforeEach(() => {
          taskServiceSpy.getTaskList$.and.returnValue(of(SAMPLE));
          fixture.detectChanges();
          divDE = fixture.debugElement.query(By.css('#tasksDoneTemplate'));
        });
        it('should render div "#tasksDoneTemplate" if Tasks Behavior Subject has Elements', () => {
          const divEl: HTMLDivElement = divDE.nativeElement;

          expect(component.tasksExists).toBeTrue();
          expect(divEl).toBeTruthy();
        });
        it('should render Paragraph Element with info about number of Completed Tasks', () => {
          const pEl: HTMLParagraphElement = divDE.query(
            By.css('p')
          ).nativeElement;

          expect(pEl).toBeTruthy();
          expect(pEl.textContent).toContain(
            `Tasks Done ${component.tasksDone.length}:`
          );
        });
        it('should render <ol> with the same number of <li> elements as the number of completed tasks', () => {
          const olDE: DebugElement = divDE.query(By.css('ol'));
          expect(olDE).toBeTruthy();
          const liDEs: DebugElement[] = olDE.queryAll(By.css('li'));
          expect(liDEs.length).toBe(component.tasksDone.length);
        });
        it('should in <li> render <div> with name property content of tasks if "task" has "end" property which is used in [appDate] pipe', () => {
          const divDEs: DebugElement[] = divDE.queryAll(By.css('ol>li>div'));
          const doneTasks = component.tasksDone;
          const elAmount = doneTasks.length;
          for (let i = 0; i < elAmount; i++) {
            const divEl: HTMLDivElement = divDEs[i].nativeElement;
            const task: Task = doneTasks[i];
            expect(divEl).toBeTruthy();
            if (task.end) {
              expect(divEl.textContent).toContain(` ${task.name} `);
            } else {
              expect(task.end).toBeTruthy();
            }
          }
        });
      });
    });

    afterEach(() => {
      component.tasksDone = [];
      component.tasksExists = false;
    });
  });

  describe('Integration Tests', () => {
    let httpTestingController: HttpTestingController;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [TasksService, HttpService],
        imports: [DoneTaskComponent, HttpClientTestingModule],
      }).compileComponents();

      httpTestingController = TestBed.inject(HttpTestingController);
      fixture = TestBed.createComponent(DoneTaskComponent);
      component = fixture.componentInstance;
    });
    beforeEach(() => {
      httpTestingController
        .expectOne(`${environment.URL_ENDPOINT}/action/find`)
        .flush({ documents: SAMPLE });
      fixture.detectChanges();
    });

    describe('ngOnInit()', () => {
      it('should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"', () => {
        component.ngOnInit();
        const filteredTasks = SAMPLE.filter((el) => el.isDone === true);
        expect(component.tasksDone).toEqual(filteredTasks);
        expect(component.tasksExists).toBeTrue();
      });
    });
    describe('Template/ShallowUnitTest', () => {
      let divDE: DebugElement;
      beforeEach(() => {
        fixture.detectChanges();
        divDE = fixture.debugElement.query(By.css('#tasksDoneTemplate'));
      });
      it('should render div "#tasksDoneTemplate" if Tasks Behavior Subject has Elements', () => {
        const divEl: HTMLDivElement = divDE.nativeElement;

        expect(component.tasksExists).toBeTrue();
        expect(divEl).toBeTruthy();
      });
      it('should render Paragraph Element with info about number of Completed Tasks', () => {
        const pEl: HTMLParagraphElement = divDE.query(
          By.css('p')
        ).nativeElement;

        expect(pEl).toBeTruthy();
        expect(pEl.textContent).toContain(
          `Tasks Done ${component.tasksDone.length}:`
        );
      });
      it('should render <ol> with the same number of <li> elements as the number of completed tasks', () => {
        const olDE: DebugElement = divDE.query(By.css('ol'));
        expect(olDE).toBeTruthy();
        const liDEs: DebugElement[] = olDE.queryAll(By.css('li'));
        expect(liDEs.length).toBe(component.tasksDone.length);
      });
      it('should in <li>render <div> with name property content of tasks if "task" has "end" property which is used in [appDate] pipe', () => {
        const divDEs: DebugElement[] = divDE.queryAll(By.css('ol>li>div'));
        const doneTasks = component.tasksDone;
        const elAmount = doneTasks.length;
        for (let i = 0; i < elAmount; i++) {
          const divEl: HTMLDivElement = divDEs[i].nativeElement;
          const task: Task = doneTasks[i];
          expect(divEl).toBeTruthy();
          if (task.end) {
            expect(divEl.textContent).toContain(` ${task.name} `);
          } else {
            expect(task.end).toBeTruthy();
          }
        }
      });
    });

    afterEach(() => {
      component.tasksDone = [];
      component.tasksExists = false;
    });
  });
});
