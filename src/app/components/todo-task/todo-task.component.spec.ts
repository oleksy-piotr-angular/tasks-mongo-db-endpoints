import { TasksService } from 'src/app/services/TaskService/tasks.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTaskComponent } from './todo-task.component';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  dataSAMPLE,
  dataSAMPLE_done,
} from 'src/app/shared/testKit/testDataSet';
import { Task } from 'src/app/models/task';
import { DateDirective } from 'src/app/shared/directives/Date/date.directive';
import { TransformTaskPipe } from 'src/app/shared/pipes/TransformTask/transform-task.pipe';
import { SortNamePipe } from 'src/app/shared/pipes/SortName/sort-name.pipe';
import {
  MockDateDirective,
  MockSortNamePipe,
  MockTransformTaskPipe,
} from 'src/app/shared/testKit/mockDependencies';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from 'src/app/services/HttpService/http.service';
import { environment } from 'src/environments/environment';
import { CustomMatchers } from 'src/app/shared/testKit/customMatchers';
describe('TodoTaskComponent', () => {
  let fixture: ComponentFixture<TodoTaskComponent>;
  let component: TodoTaskComponent;
  let SAMPLE: Task[];

  beforeEach(() => {
    SAMPLE = dataSAMPLE;
  });

  describe('Isolated Unit Tests', () => {
    let taskServiceSpy: jasmine.SpyObj<TasksService>;
    const taskServiceSpyObj = jasmine.createSpyObj(TasksService, [
      'getTaskList$',
      'remove',
      'done',
    ]);
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [{ provide: TasksService, useValue: taskServiceSpyObj }],
        imports: [TodoTaskComponent],
      })
        .overrideComponent(TodoTaskComponent, {
          remove: {
            imports: [DateDirective, TransformTaskPipe, SortNamePipe],
          },
          add: {
            imports: [
              MockDateDirective,
              MockTransformTaskPipe,
              MockSortNamePipe,
            ],
          },
        })
        .compileComponents();

      fixture = TestBed.createComponent(TodoTaskComponent);
      component = fixture.componentInstance;
      taskServiceSpy = <jasmine.SpyObj<TasksService>>(
        TestBed.inject(TasksService)
      );
    });

    it('should create Component Instance', () => {
      expect(component).toBeTruthy();
    });
    it('should be init with empty Array of "tasksList" property', () => {
      expect(component.tasksList).toEqual([]);
    });
    it('should be init with false value for "tasksExist" property', () => {
      expect(component.tasksExists).toBeFalse();
    });
    describe('Component Initialization:', () => {
      beforeEach(() => {
        taskServiceSpy.getTaskList$.and.returnValue(of(SAMPLE));
      });

      describe('ngOnInit()', () => {
        it('should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"', () => {
          component.ngOnInit();
          const filteredTasks = SAMPLE.filter((el) => el.isDone === false);
          expect(component.tasksList).toEqual(filteredTasks);
          expect(component.tasksExists).toBeTrue();
        });
      });

      describe('remove()', () => {
        it('should call "taskService.remove()" method with "task" to remove in params', () => {
          fixture.detectChanges();
          const taskToRemove = component.tasksList[0];
          component.remove(taskToRemove);
          expect(taskServiceSpy.remove).toHaveBeenCalledOnceWith(taskToRemove);
        });
      });
      describe('done()', () => {
        it('should call "taskService.done()" method with "task" in params to mark it as done', () => {
          fixture.detectChanges();
          const taskToDone = component.tasksList[0];
          component.done(taskToDone);
          expect(taskServiceSpy.done).toHaveBeenCalledOnceWith(taskToDone);
        });
      });
      describe('setSelector()', () => {
        it('should return "green" or "red" if the number of "tasksList" elements is equal or greater than 5 or less', () => {
          fixture.detectChanges();
          const defColorLess = 'green';
          const defColorGreaterOrEq = 'red';
          expect(component.setColor()).toBe(defColorLess);
          component.tasksList.push(...SAMPLE);
          expect(component.tasksList.length > 5).toBeTrue();
          expect(component.setColor()).toBe(defColorGreaterOrEq);
          component.tasksList.pop();
          expect(component.tasksList.length).toBe(5);
          expect(component.setColor()).toBe(defColorGreaterOrEq);
        });
      });
    });

    describe('Template/ShallowUnitTest', () => {
      describe('Tasks Not Exist', () => {
        it('should not render div "#tasksToDoTemplate" if Tasks Behavior Subject has no Elements', () => {
          taskServiceSpy.getTaskList$.and.returnValue(of([]));
          fixture.detectChanges();
          const divDE: DebugElement = fixture.debugElement.query(
            By.css('#tasksToDoTemplate')
          );
          expect(component.tasksExists).toBeFalse();
          expect(divDE).toBeFalsy();
        });
      });
      describe('Only Completed Tasks Exist', async () => {
        it('should render only #noTask "TemplateRef" if all Tasks are completed', async () => {
          taskServiceSpy.getTaskList$.and.returnValue(of(dataSAMPLE_done));
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const taskToDoList = fixture.debugElement.query(
              By.css('ol#taskToDoList')
            );
            const noTask = fixture.debugElement.query(By.css('#noTask'));
            const textContent: string | null = (<HTMLParagraphElement>(
              noTask.nativeElement
            )).textContent;

            expect(taskToDoList).toBeFalsy;
            expect(noTask).toBeTruthy();
            expect(textContent).toEqual(
              ' No tasks... Now you have free time to relax... '
            );
          });
        });
      });
      describe('Tasks "ToDo" and "Done" Exist', () => {
        beforeEach(() => {
          taskServiceSpy.getTaskList$.and.returnValue(of(SAMPLE));
          component.tasksExists = true;
          component.tasksList = SAMPLE;
          fixture.detectChanges();
        });

        it('should render div "#tasksToDoTemplate" if "tasksExists" property is true', () => {
          const divEl: HTMLDivElement = fixture.debugElement.query(
            By.css('#tasksToDoTemplate')
          ).nativeElement;
          expect(component.tasksExists).toBeTrue();
          expect(divEl).toBeTruthy();
        });
        describe('Paragraph with number of TO-DO tasks', () => {
          let pToDoEl: HTMLParagraphElement;
          beforeEach(() => {
            taskServiceSpy.getTaskList$.and.returnValue(of(SAMPLE));
            pToDoEl = fixture.debugElement.query(
              By.css('#tasksToDoTemplate p')
            ).nativeElement;
          });

          it('should render info about number of Uncompleted Tasks', () => {
            expect(pToDoEl).toBeTruthy();
            expect(pToDoEl.textContent).toContain(
              `To do: ${component.tasksList.length}`
            );
          });

          it('should have style changed with [ngStyle] condition if it has equal or greater than 5 or less', () => {
            const definedStyleG = 'color: green';
            const definedStyleR = 'color: red';

            expect(component.tasksList.length < 5).toBeTrue();
            expect(pToDoEl.getAttribute('style')).toContain(definedStyleG);
            //-------------------------------------------------------------
            component.tasksList = [
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
            ];
            fixture.detectChanges();
            expect(component.tasksList.length >= 5).toBeTrue();
            expect(pToDoEl.getAttribute('style')).toContain(definedStyleR);
          });
          afterAll(() => {
            component.tasksList = [];
          });
        });
        describe('TaskList ToDo', async () => {
          let taskToDoList: DebugElement;
          let liDEs: DebugElement[];
          beforeEach(() => {
            taskToDoList = fixture.debugElement.query(
              By.css('ol#taskToDoList')
            );
            liDEs = taskToDoList.queryAll(By.css('li'));
          });
          it('should render "ol#taskToDoList" with the same number of <li> elements as the number of Uncompleted tasks', async () => {
            fixture.whenStable().then(() => {
              const tasksToDo = component.tasksList;
              const noTask = fixture.debugElement.query(By.css('#noTask'));
              expect(taskToDoList).toBeTruthy();
              expect(noTask).toBeFalsy();
              expect(liDEs.length).toBe(tasksToDo.length);
            });
          });
          it('should in <li> render <p> with name property content of tasks if "task" has "created" property which is used in [appDate] pipe', () => {
            const pDEs: DebugElement[] = taskToDoList.queryAll(By.css('li p'));
            const tasksToDo = component.tasksList;
            const elAmount = tasksToDo.length;
            for (let i = 0; i < elAmount; i++) {
              const pEl: HTMLParagraphElement = pDEs[i].nativeElement;
              const task: Task = tasksToDo[i];
              expect(pEl).toBeTruthy();
              if (task.created) {
                expect(pEl.textContent).toContain(`${task.name}`);
              } else {
                expect(task.created).toBeTruthy();
              }
            }
          });
          it('should  change class with [ngClass] condition if it is odd or last of list element', () => {
            const defClassOdd = 'odd-li';
            const defClassLast = 'last-list';
            const elAmount = liDEs.length;
            for (let i = 0; i < elAmount; i++) {
              if (i % 2 !== 0)
                expect(
                  (<HTMLLIElement>liDEs[i].nativeElement).getAttribute('class')!
                ).toContain(defClassOdd);
            }
            //-------------------------------------------------------------------
            component.tasksList = [
              { name: 'test', created: 'test', isDone: false },
            ];
            fixture.detectChanges();
            const liEl: HTMLLIElement = taskToDoList.query(
              By.css('li')
            ).nativeElement;
            expect(component.tasksList.length).toBe(1);
            expect(liEl.getAttribute('class')).toContain(defClassLast);
          });
          it('should render "Remove" button with defined class and "click" event which handle "remove()" method for each', () => {
            spyOn(component, 'remove');
            const definedClass = 'btn btn-danger';
            const tasksToDo = component.tasksList;
            const elAmount = tasksToDo.length;

            for (let i = 0; i < elAmount; i++) {
              const buttonDE: DebugElement = liDEs[i].query(
                By.css('button#removeBtn')
              );
              buttonDE.triggerEventHandler('click');
              expect(component.remove).toHaveBeenCalled();
              expect(component.remove).toHaveBeenCalledWith(tasksToDo[i]);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).getAttribute(
                  'class'
                )
              ).toContain(definedClass);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).textContent
              ).toBe(' Remove ');
              expect((<HTMLButtonElement>buttonDE.nativeElement).type).toBe(
                'button'
              );
            }
            expect(component.remove).toHaveBeenCalledTimes(elAmount);
          });
          it('should render "Done" button with defined class and "click" event which handle "done()" method for each', () => {
            spyOn(component, 'done');
            const definedClass = 'btn btn-success';
            const tasksToDo = component.tasksList;
            const elAmount = tasksToDo.length;

            for (let i = 0; i < elAmount; i++) {
              const buttonDE: DebugElement = liDEs[i].query(
                By.css('button#doneBtn')
              );
              buttonDE.triggerEventHandler('click');
              expect(component.done).toHaveBeenCalled();
              expect(component.done).toHaveBeenCalledWith(tasksToDo[i]);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).getAttribute(
                  'class'
                )
              ).toContain(definedClass);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).textContent
              ).toBe(' Done ');
              expect((<HTMLButtonElement>buttonDE.nativeElement).type).toBe(
                'button'
              );
            }
            expect(component.done).toHaveBeenCalledTimes(elAmount);
          });
        });

        afterEach(() => {
          component.tasksList = [];
          component.tasksExists = false;
        });
      });
    });
  });

  describe('Integration Tests', () => {
    let httpTestingController: HttpTestingController;
    let tasksService: TasksService;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [TasksService, HttpService],
        imports: [TodoTaskComponent, HttpClientTestingModule],
      }).compileComponents();

      httpTestingController = TestBed.inject(HttpTestingController);
      tasksService = TestBed.inject(TasksService);
      fixture = TestBed.createComponent(TodoTaskComponent);
      component = fixture.componentInstance;
    });
    function loadData() {
      const testRequest = httpTestingController.expectOne(
        `${environment.URL_ENDPOINT}/action/find`
      );
      testRequest.flush({ documents: SAMPLE });
      fixture.detectChanges();
    }

    describe('Component Initialization:', () => {
      beforeEach(() => {
        loadData();
      });

      describe('ngOnInit()', () => {
        it('should initialize the "Task[]" array as the value of the "tasksDone" property from the returned and filtered array from "Observable<Task[]>" when subscribing to "tasksService.getTaskList$()"', () => {
          component.ngOnInit();
          const filteredTasks = SAMPLE.filter((el) => el.isDone === false);
          expect(component.tasksList).toEqual(filteredTasks);
          expect(component.tasksExists).toBeTrue();
        });
      });

      describe('remove()', () => {
        it('should remove given task from "tasksList[]" param elements', () => {
          const taskToRemove = component.tasksList[0];
          component.remove(taskToRemove);
          httpTestingController
            .expectOne(`${environment.URL_ENDPOINT}/action/deleteOne`)
            .flush({ deletedCount: 1 });

          expect(component.tasksList).not.toContain(
            jasmine.arrayContaining([taskToRemove])
          );
        });
      });
      describe('done()', () => {
        let taskToDone: Task;
        it('should call "taskService.done()" method with "task" in params to mark it as done', () => {
          jasmine.addMatchers(CustomMatchers);
          taskToDone = component.tasksList[0];

          component.done(taskToDone);
          httpTestingController
            .expectOne(`${environment.URL_ENDPOINT}/action/updateOne`)
            .flush({ matchedCount: 1, modifiedCount: 1 });

          tasksService.getTaskList$().subscribe((tasks) => {
            const updatedTask = tasks.filter((t) => t._id === taskToDone._id);
            expect(updatedTask[0].isDone).toBeTrue();
            expect(updatedTask[0].end).toBeDateToLocaleString();
          });
        });
        afterEach(() => {
          //CleanUp
          //restarting the data state/back to "uncompleted" task state
          taskToDone.isDone = false;
          delete taskToDone.end;
        });
      });

      describe('setSelector()', () => {
        it('should return "green" or "red" if the number of "tasksList" elements is equal or greater than 5 or less', () => {
          const defColorLess = 'green';
          const defColorGreaterOrEq = 'red';

          expect(component.tasksList.length < 5).toBeTrue();
          expect(component.setColor()).toBe(defColorLess);

          component.tasksList.push(...SAMPLE);
          expect(component.tasksList.length > 5).toBeTrue();
          expect(component.setColor()).toBe(defColorGreaterOrEq);

          component.tasksList.pop();
          expect(component.tasksList.length).toBe(5);
          expect(component.setColor()).toBe(defColorGreaterOrEq);
        });
      });
    });

    describe('Template', () => {
      beforeEach(() => {
        loadData();
      });

      describe('Tasks "ToDo" and "Done" Exist', () => {
        it('should render div "#tasksToDoTemplate" if "tasksExists" property is true', () => {
          const divEl: HTMLDivElement = fixture.debugElement.query(
            By.css('#tasksToDoTemplate')
          ).nativeElement;
          expect(component.tasksExists).toBeTrue();
          expect(divEl).toBeTruthy();
        });
        describe('Paragraph with number of TO-DO tasks', () => {
          let pToDoEl: HTMLParagraphElement;
          beforeEach(() => {
            pToDoEl = fixture.debugElement.query(
              By.css('#tasksToDoTemplate p')
            ).nativeElement;
          });

          it('should render info about number of Uncompleted Tasks', () => {
            expect(pToDoEl).toBeTruthy();
            expect(pToDoEl.textContent).toContain(
              `To do: ${component.tasksList.length}`
            );
          });

          it('should have style changed with [ngStyle] condition if it has equal or greater than 5 or less', () => {
            const definedStyleG = 'color: green';
            const definedStyleR = 'color: red';

            expect(component.tasksList.length < 5).toBeTrue();
            expect(pToDoEl.getAttribute('style')).toContain(definedStyleG);
            //-------------------------------------------------------------
            component.tasksList = [
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
              { name: 'test', created: 'test', isDone: false },
            ];
            fixture.detectChanges();
            expect(component.tasksList.length >= 5).toBeTrue();
            expect(pToDoEl.getAttribute('style')).toContain(definedStyleR);
          });
          afterAll(() => {
            component.tasksList = [];
          });
        });
        describe('TaskList ToDo', async () => {
          let taskToDoList: DebugElement;
          let liDEs: DebugElement[];
          beforeEach(() => {
            taskToDoList = fixture.debugElement.query(
              By.css('ol#taskToDoList')
            );
            liDEs = taskToDoList.queryAll(By.css('li'));
          });
          it('should render "ol#taskToDoList" with the same number of <li> elements as the number of Uncompleted tasks', async () => {
            fixture.whenStable().then(() => {
              const tasksToDo = component.tasksList;
              const noTask = fixture.debugElement.query(By.css('#noTask'));
              expect(taskToDoList).toBeTruthy();
              expect(noTask).toBeFalsy();
              expect(liDEs.length).toBe(tasksToDo.length);
            });
          });
          it('should in <li> render <p> with name property content of tasks if "task" has "created" property which is used in [appDate] pipe', () => {
            const pDEs: DebugElement[] = taskToDoList.queryAll(By.css('li p'));
            const tasksToDo = component.tasksList;
            const elAmount = tasksToDo.length;
            for (let i = 0; i < elAmount; i++) {
              const pEl: HTMLParagraphElement = pDEs[i].nativeElement;
              const task: Task = tasksToDo[i];
              expect(pEl).toBeTruthy();
              if (task.created) {
                expect(pEl.textContent).toContain(`${task.name}`);
              } else {
                expect(task.created).toBeTruthy();
              }
            }
          });
          it('should  change class with [ngClass] condition if it is odd or last of list element', () => {
            const defClassOdd = 'odd-li';
            const defClassLast = 'last-list';
            const elAmount = liDEs.length;
            for (let i = 0; i < elAmount; i++) {
              if (i % 2 !== 0)
                expect(
                  (<HTMLLIElement>liDEs[i].nativeElement).getAttribute('class')!
                ).toContain(defClassOdd);
            }
            //-------------------------------------------------------------------
            component.tasksList = [
              { name: 'test', created: 'test', isDone: false },
            ];
            fixture.detectChanges();
            const liEl: HTMLLIElement = taskToDoList.query(
              By.css('li')
            ).nativeElement;
            expect(component.tasksList.length).toBe(1);
            expect(liEl.getAttribute('class')).toContain(defClassLast);
          });
          it('should render "Remove" button with defined class and "click" event which handle "remove()" method for each', () => {
            spyOn(component, 'remove');
            const definedClass = 'btn btn-danger';
            const tasksToDo = component.tasksList;
            const elAmount = tasksToDo.length;

            for (let i = 0; i < elAmount; i++) {
              const buttonDE: DebugElement = liDEs[i].query(
                By.css('button#removeBtn')
              );
              buttonDE.triggerEventHandler('click');
              expect(component.remove).toHaveBeenCalled();
              expect(component.remove).toHaveBeenCalledWith(tasksToDo[i]);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).getAttribute(
                  'class'
                )
              ).toContain(definedClass);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).textContent
              ).toBe(' Remove ');
              expect((<HTMLButtonElement>buttonDE.nativeElement).type).toBe(
                'button'
              );
            }
            expect(component.remove).toHaveBeenCalledTimes(elAmount);
          });
          it('should render "Done" button with defined class and "click" event which handle "done()" method for each', () => {
            spyOn(component, 'done');
            const definedClass = 'btn btn-success';
            const tasksToDo = component.tasksList;
            const elAmount = tasksToDo.length;

            for (let i = 0; i < elAmount; i++) {
              const buttonDE: DebugElement = liDEs[i].query(
                By.css('button#doneBtn')
              );
              buttonDE.triggerEventHandler('click');
              expect(component.done).toHaveBeenCalled();
              expect(component.done).toHaveBeenCalledWith(tasksToDo[i]);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).getAttribute(
                  'class'
                )
              ).toContain(definedClass);
              expect(
                (<HTMLButtonElement>buttonDE.nativeElement).textContent
              ).toBe(' Done ');
              expect((<HTMLButtonElement>buttonDE.nativeElement).type).toBe(
                'button'
              );
            }
            expect(component.done).toHaveBeenCalledTimes(elAmount);
          });
        });

        afterEach(() => {
          component.tasksList = [];
          component.tasksExists = false;
        });
      });
    });
  });
});
