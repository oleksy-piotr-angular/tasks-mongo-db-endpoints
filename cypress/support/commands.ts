import { environment } from './../../src/environments/environment';
import { Task } from '../../src/app/models/task';

export {}; //?to use "global" namespace
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      seedAndVisit(seedData: string): Chainable<Element>;
      clearAndVisit(): Chainable<Element>;
    }
  }
}
Cypress.Commands.add('seedAndVisit', (seedData) => {
  cy.intercept('**/action/find', { fixture: seedData }).as('getCitiesStub');
  cy.visit('/');
});
Cypress.Commands.add('clearAndVisit', () => {
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
  cy.visit('/');
});
