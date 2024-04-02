import { API_response } from './../../models/api_response';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { dataNEW_TASK, dataSAMPLE } from 'src/app/shared/testKit/testDataSet';

describe('HttpService', () => {
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;
  let SAMPLE: API_response;
  beforeEach(() => {
    SAMPLE = {
      documents: dataSAMPLE,
    };
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule],
    });
    httpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getTasks()', () => {
    it('should  send expected body to get expected response from API when "getTasks()" is called', (done: DoneFn) => {
      const expectedBody = {
        dataSource: 'test-tasks-mongo-db-endpoints',
        database: 'AngularPractice',
        collection: 'tasks',
      };

      httpService.getTasks().subscribe((tasksData) => {
        expect(tasksData).toBe(SAMPLE);
        done();
      });

      const testRequest = httpTestingController.expectOne(
        `${environment.URL_ENDPOINT}/action/find`
      );

      testRequest.flush(SAMPLE);
      expect(testRequest.request.method).toBe('POST');
      expect(testRequest.request.body).toEqual(expectedBody);
    });
  });
  describe('saveOneTask()', () => {
    it('should  send expected body with the task to API to save it and receive "_id" value for it', (done: DoneFn) => {
      const NEW_TASK = dataNEW_TASK;
      const expectedBody = {
        dataSource: 'test-tasks-mongo-db-endpoints',
        database: 'AngularPractice',
        collection: 'tasks',
        document: NEW_TASK,
      };
      const expectedResponse = {
        _id: '65f61f445de588ed3759fc68',
      };

      httpService.saveOneTask(NEW_TASK).subscribe((_data) => {
        expect(_data).toBe(expectedResponse);
        done();
      });

      const testRequest = httpTestingController.expectOne(
        `${environment.URL_ENDPOINT}/action/insertOne`
      );

      testRequest.flush(expectedResponse);
      expect(testRequest.request.method).toBe('POST');
      expect(testRequest.request.body).toEqual(expectedBody);
    });
  });
  describe(' removeDoneTasksFromDB()', () => {
    it('should send expected body to remove all Completed Tasks in API', (done: DoneFn) => {
      const expectedBody = {
        dataSource: 'test-tasks-mongo-db-endpoints',
        database: 'AngularPractice',
        collection: 'tasks',
        filter: { isDone: true },
      };
      const expectedResponse = { deletedCount: 2 };

      httpService.removeDoneTasksFromDB().subscribe((response) => {
        expect(response).toBe(expectedResponse);
        done();
      });

      const testRequest = httpTestingController.expectOne(
        `${environment.URL_ENDPOINT}/action/deleteMany`
      );

      testRequest.flush(expectedResponse);
      expect(testRequest.request.method).toBe('POST');
      expect(testRequest.request.body).toEqual(expectedBody);
    });
  });
  describe('updateOneTaskToDone()', () => {
    it('should send expected body with the task marking it as completed in API', (done: DoneFn) => {
      const expectedBody = {
        dataSource: 'test-tasks-mongo-db-endpoints',
        database: 'AngularPractice',
        collection: 'tasks',
        filter: { _id: { $oid: SAMPLE.documents[2]._id } },
        update: {
          $set: {
            isDone: true,
            end: SAMPLE.documents[2].end,
          },
        },
      };
      const expectedResponse = { matchedCount: 1, modifiedCount: 1 };

      httpService
        .updateOneTaskToDone(SAMPLE.documents[2])
        .subscribe((response) => {
          expect(response).toBe(expectedResponse);
          done();
        });

      const testRequest = httpTestingController.expectOne(
        `${environment.URL_ENDPOINT}/action/updateOne`
      );

      testRequest.flush(expectedResponse);
      expect(testRequest.request.method).toBe('POST');
      expect(testRequest.request.body).toEqual(expectedBody);
    });
  });
  describe('removeOneTask()', () => {
    it('should send expected body to remove one task from API', (done: DoneFn) => {
      const expectedBody = {
        dataSource: 'test-tasks-mongo-db-endpoints',
        database: 'AngularPractice',
        collection: 'tasks',
        filter: { _id: { $oid: SAMPLE.documents[2]._id } },
      };
      const expectedResponse = { deletedCount: 1 };

      httpService.removeOneTask(SAMPLE.documents[2]).subscribe((response) => {
        expect(response).toBe(expectedResponse);
        done();
      });

      const testRequest = httpTestingController.expectOne(
        `${environment.URL_ENDPOINT}/action/deleteOne`
      );

      testRequest.flush(expectedResponse);
      expect(testRequest.request.method).toBe('POST');
      expect(testRequest.request.body).toEqual(expectedBody);
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
