import { environment } from './../../src/environments/environment';
import { Task } from '../../src/app/models/task';
import { API_response } from '../../src/app/models/api_response';

export {}; //?to use "global" namespace
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      seedMockData(seedData: string): Chainable<Element>;
      emptyMockData(): Chainable<Element>;
      loadDataIntoDB(): Chainable<Element>;
      clearDB(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('seedMockData', (seedData) => {
  cy.intercept('**/action/find', { fixture: seedData }).as('getTasksStub');
  cy.intercept('**/action/insertOne', {
    insertedId: 'mockId',
  }).as('insertTaskStub');
  cy.intercept('**/action/deleteOne', { deletedCount: 1 }).as('getTasksStub');
  cy.intercept('**/action/updateOne', { matchedCount: 1, modifiedCount: 1 }).as(
    'getTasksStub'
  );
  cy.intercept('**/action/deleteMany', { deletedCount: 'infinite' }).as(
    'clearTasksStub'
  );
});

Cypress.Commands.add('emptyMockData', () => {
  cy.intercept('**/action/find', { documents: [] }).as('getTasksStub');
  cy.intercept('**/action/insertOne', {
    insertedId: 'mockId',
  }).as('insertTaskStub');
  cy.intercept('**/action/deleteOne', { deletedCount: 1 }).as('getTasksStub');
  cy.intercept('**/action/updateOne', { matchedCount: 1, modifiedCount: 1 }).as(
    'getTasksStub'
  );
  cy.intercept('**/action/deleteMany', { deletedCount: 'infinite' }).as(
    'clearTasksStub'
  );
});

Cypress.Commands.add('clearDB', () => {
  const _body = {
    dataSource: environment.DATA_SOURCE,
    database: environment.DATABASE,
    collection: environment.COLLECTION,
    filter: {},
  };
  cy.request({
    method: 'POST',
    url: `${environment.URL_ENDPOINT}/action/deleteMany`,
    body: _body,
  });
});

Cypress.Commands.add('loadDataIntoDB', () => {
  cy.fixture('tasksDB').then((response: API_response) => {
    const tasks = response.documents;
    tasks.forEach((_task) => {
      const task: Task = {
        name: _task.name,
        created: _task.name,
        isDone: false,
      };
      const _body = {
        dataSource: environment.DATA_SOURCE,
        database: environment.DATABASE,
        collection: environment.COLLECTION,
        document: task,
      };

      cy.request({
        method: 'POST',
        url: `${environment.URL_ENDPOINT}/action/insertOne`,
        body: _body,
      });
    });
  });
});
