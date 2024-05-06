import { TestBed } from '@angular/core/testing';
import { HttpService } from './../HttpService/http.service';
import { Task } from './../../models/task';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { of } from 'rxjs';
import { CustomMatchers } from '../../shared/testKit/customMatchers';
import { dataNEW_TASK, dataSAMPLE } from 'src/app/shared/testKit/testDataSet';
import { environment } from 'src/environments/environment';

describe('TasksService', () => {
  let NEW_TASK: Task;
  let SAMPLE: Task[];
  let taskService: TasksService;
  beforeEach(() => {
    NEW_TASK = dataNEW_TASK;
    SAMPLE = dataSAMPLE;
  });
  describe('Isolated Unit Tests', () => {
    let httpServiceSpy: jasmine.SpyObj<HttpService>;
    beforeEach(() => {
      const httpServiceSpyObj = jasmine.createSpyObj('HttpService', [
        'getTasks',
        'saveOneTask',
        'removeOneTask',
        'updateOneTaskToDone',
        'removeDoneTasksFromDB',
      ]);
      TestBed.configureTestingModule({
        providers: [
          { provide: HttpService, useValue: httpServiceSpyObj },
          TasksService,
        ],
        imports: [HttpClientTestingModule],
      });
      httpServiceSpy = <jasmine.SpyObj<HttpService>>TestBed.inject(HttpService);
      httpServiceSpy.getTasks.and.returnValue(of({ documents: SAMPLE }));
      taskService = TestBed.inject(TasksService);
    });
    describe('constructor()', () => {
      it('should call private method "getTasksFromDB()" when is initialized', () => {
        expect(httpServiceSpy.getTasks).toHaveBeenCalledOnceWith();
      });
    });
    describe('getTasksFromDB() ', () => {
      it('should pass received Array Tasks into private BehaviorSubject "tasksList$"', () => {
        taskService
          .getTaskList$()
          .subscribe((tasks) => expect(tasks).toEqual(SAMPLE));
      });
    });
    describe('getTaskList$()', () => {
      it('should return an array from the private property "taskList$"', () => {
        taskService.getTaskList$().subscribe((data) => {
          expect(Array.isArray(data)).toBeTrue();
        });
      });
    });
    describe('add()', () => {
      beforeEach(() => {
        httpServiceSpy.saveOneTask.and.returnValue(
          of(<Pick<Task, '_id'>>{ id: '65f9dc230e9a741222839172' })
        );
        taskService.add(NEW_TASK);
      });
      it('should call "httpService.saveOneTask()" method only one time with given Param', () => {
        expect(httpServiceSpy.saveOneTask).toHaveBeenCalledOnceWith(NEW_TASK);
      });
      it('should add a new Task to The Existing  "taskList$" property', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks.length).toBe(5);
          expect(tasks).toEqual(jasmine.arrayContaining([NEW_TASK]));
        });
      });
    });
    describe('remove()', () => {
      beforeEach(() => {
        httpServiceSpy.removeOneTask.and.returnValue(of({ deletedCount: 1 }));
        taskService.remove(SAMPLE[0]);
      });

      it('should call "httpService.removeOneTask()" method only one time with given Param', () => {
        expect(httpServiceSpy.removeOneTask).toHaveBeenCalledOnceWith(
          SAMPLE[0]
        );
      });
      it('should remove element which was given in Param from "taskList$" property', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks).not.toContain(jasmine.arrayContaining([SAMPLE[0]]));
        });
      });
    });
    describe('done()', () => {
      beforeEach(() => {
        httpServiceSpy.updateOneTaskToDone.and.returnValue(
          of({ matchedCount: 1, modifiedCount: 1 })
        );
        taskService.done(SAMPLE[3]);
      });

      it('should call "httpService.updateOneTaskToDone()" method only one time with given Param', () => {
        expect(httpServiceSpy.updateOneTaskToDone).toHaveBeenCalledOnceWith(
          SAMPLE[3]
        );
      });
      it('should update the "isDone" to true for the element in "taskList$" property', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks[3].isDone).toBeTrue();
        });
      });
      it('should set string data in the "end" property for the element in "taskList$" property', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(typeof tasks[3].end).toBe('string');
        });
      });
      it('should be string date created from Date type using "toLocaleString()" method', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          jasmine.addMatchers(CustomMatchers);
          expect(tasks[3].end).toBeDateToLocaleString();
        });
      });
      afterEach(() => {
        SAMPLE[3].isDone = false;
        delete SAMPLE[3].end;
      });
    });
    describe('clearDoneTaskInDB()', () => {
      beforeEach(() => {
        httpServiceSpy.removeDoneTasksFromDB.and.returnValue(
          of({ deletedCount: 2 })
        );
        taskService.clearDoneTasksInDB();
      });

      it('should call "httpService.removeDoneTasksFromDB()" only one time without Params"', () => {
        expect(httpServiceSpy.removeDoneTasksFromDB).toHaveBeenCalledOnceWith();
      });
      it('should also remove only completed tasks from "tasksList$"', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks.length).toBe(2);
          for (let el of tasks) {
            expect(el.isDone).toBeFalse();
          }
        });
      });
    });
  });
  describe('Integration Tests', () => {
    let httpService: HttpService;
    let httpTestingController: HttpTestingController;
    let testRequest: TestRequest;
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [HttpService, TasksService],
        imports: [HttpClientTestingModule],
      });
      taskService = TestBed.inject(TasksService);
      httpService = TestBed.inject(HttpService);
      httpTestingController = TestBed.inject(HttpTestingController);
      testRequest = httpTestingController.expectOne(
        environment.URL_ENDPOINT + '/action/find'
      );
      testRequest.flush({ documents: SAMPLE });
    });

    describe('constructor()', () => {
      it('should call private method "getTasksFromDB()" when is initialized to send "POST" method', () => {
        expect(testRequest.request.method).toBe('POST');
      });
    });
    describe('getTasksFromDB() ', () => {
      it('should pass received Array Task into private BehaviorSubject "tasksList$"', () => {
        taskService
          .getTaskList$()
          .subscribe((tasks) => expect(tasks).toEqual(SAMPLE));
      });
    });
    describe('getTaskList$()', () => {
      it('should return an array from the private property "taskList$"', () => {
        taskService.getTaskList$().subscribe((data) => {
          expect(Array.isArray(data)).toBeTrue();
        });
      });
    });

    describe('add()', () => {
      let testSaveRequest: TestRequest;
      let expectedResponse: { _id: string };
      beforeEach(() => {
        expectedResponse = {
          _id: '1111111111111111111111',
        };
        taskService.add(NEW_TASK);
        testSaveRequest = httpTestingController.expectOne(
          environment.URL_ENDPOINT + '/action/insertOne'
        );
        testSaveRequest.flush(expectedResponse);
      });
      it('should call "httpService.saveOneTask() to send "POST" method" ', () => {
        expect(testSaveRequest.request.method).toBe('POST');
      });
      it('should add a new Task to The Existing  "taskList$" property with received ID from response', () => {
        NEW_TASK._id = expectedResponse._id;
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks.length).toBe(5);
          expect(tasks).toEqual(jasmine.arrayContaining([NEW_TASK]));
        });
      });
    });

    describe('remove()', () => {
      beforeEach(() => {
        const expectedResponse = { deletedCount: 1 };
        taskService.remove(SAMPLE[2]);
        testRequest = httpTestingController.expectOne(
          environment.URL_ENDPOINT + '/action/deleteOne'
        );

        testRequest.flush(expectedResponse);
      });

      it('should call "httpService.removeOneTask()" to send "POST" method', () => {
        expect(testRequest.request.method).toBe('POST');
      });
      it('should remove element which was given in Param from "taskList$" property', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks).not.toEqual(jasmine.arrayContaining([SAMPLE[2]]));
        });
      });
    });

    describe('done()', () => {
      beforeEach(() => {
        const expectedResponse = { matchedCount: 1, modifiedCount: 1 };
        taskService.done(SAMPLE[3]);
        testRequest = httpTestingController.expectOne(
          environment.URL_ENDPOINT + '/action/updateOne'
        );
        testRequest.flush(expectedResponse);
      });
      it('should call "httpService.updateOneTaskToDone() to send "POST" method"', () => {
        expect(testRequest.request.method).toBe('POST');
      });
      it('should update the "isDone" to true for the element in "taskList$" property', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks[3].isDone).toBeTrue();
        });
      });
      it('should set string data in the "end" property for the element in "taskList$" property', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(typeof tasks[3].end).toBe('string');
        });
      });
      it('should be string date created from Date type using "toLocaleString()" method', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          jasmine.addMatchers(CustomMatchers);
          expect(tasks[3].end).toBeDateToLocaleString();
        });
      });
      afterEach(() => {
        SAMPLE[3].isDone = false;
        delete SAMPLE[3].end;
      });
    });
    describe('clearDoneTaskInDB()', () => {
      beforeEach(() => {
        const expectedResponse = { deletedCount: 2 };
        taskService.clearDoneTasksInDB();
        testRequest = httpTestingController.expectOne(
          environment.URL_ENDPOINT + '/action/deleteMany'
        );
        testRequest.flush(expectedResponse);
      });

      it('should call "httpService.removeDoneTasksFromDB()" to send "POST" method', () => {
        expect(testRequest.request.method).toBe('POST');
      });
      it('should remove only completed tasks from "tasksList$"', () => {
        taskService.getTaskList$().subscribe((tasks) => {
          expect(tasks.length).toBe(2);
          for (let el of tasks) {
            expect(el.isDone).toBeFalse();
          }
        });
      });
    });
  });
});
