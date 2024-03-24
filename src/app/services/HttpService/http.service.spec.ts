import { Task } from './../../models/task';
import { API_response } from './../../models/api_response';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;
  let SAMPLE: API_response;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule],
    });
    httpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('getTasks()', () => {
    it('should  send expected body to get expected response from API when "getTasks()" is called', (done: DoneFn) => {
      SAMPLE = {
        documents: [
          {
            _id: '65f9dc230e9a741b2f839172',
            name: 'HttpServiceSpec1',
            created: '19.03.2024, 19:40:35',
            isDone: true,
            end: '19.03.2024, 19:56:13',
          },
          {
            _id: '65f61f445de588ed3759fc68',
            name: 'HttpServiceSpec2',
            created: '16.03.2024, 23:37:56',
            isDone: true,
            end: '17.03.2024, 00:01:27',
          },
          {
            _id: '65f752947d19b8ac9ed778e6',
            name: 'HttpServiceSpec3',
            created: '17.03.2024, 21:29:07',
            isDone: false,
          },
          {
            _id: '65f9c5d95ce004f4077cd60f',
            name: 'HttpServiceSpec4',
            created: '19.03.2024, 18:05:29',
            isDone: false,
          },
        ],
      };
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
        'https://eu-central-1.aws.data.mongodb-api.com/app/data-dopou/endpoint/data/v1/action/find'
      );

      testRequest.flush(SAMPLE);
      expect(testRequest.request.method).toBe('POST');
      expect(testRequest.request.body).toEqual(expectedBody);
    });
  });
  describe('saveOneTask()', () => {
    it('should  send expected body with the task to API to save it and receive "_id" value for it', (done: DoneFn) => {
      const NEW_TASK = {
        name: 'newTask',
        created: '17.03.2024, 21:10:07',
        isDone: false,
      };
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
        'https://eu-central-1.aws.data.mongodb-api.com/app/data-dopou/endpoint/data/v1/action/insertOne'
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
        'https://eu-central-1.aws.data.mongodb-api.com/app/data-dopou/endpoint/data/v1/action/deleteMany'
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
        'https://eu-central-1.aws.data.mongodb-api.com/app/data-dopou/endpoint/data/v1/action/updateOne'
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
        'https://eu-central-1.aws.data.mongodb-api.com/app/data-dopou/endpoint/data/v1/action/deleteOne'
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
