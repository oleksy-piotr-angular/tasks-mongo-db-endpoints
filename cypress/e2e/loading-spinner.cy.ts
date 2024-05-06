import { API_response } from '../../src/app/models/api_response';
import { Task } from '../../src/app/models/task';
import { environment } from '../../src/environments/environment';

describe('Loader for each Type of event', () => {
  context('with a real response', () => {
    beforeEach(() => {
      cy.loadDataIntoDB();
    });
    it('Should show "loading-spinner" when data is loading then hide after Response', () => {
      cy.intercept('**/action/find', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('getTasks');
      cy.visit('/');
      cy.get('.lds-roller').should('be.visible');
      cy.wait('@getTasks');
      cy.get('.lds-roller').should('not.exist');
    });
    it('Should show "loading-spinner" when add a new task then hide after Response', () => {
      cy.intercept('**/action/insertOne', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('addTask');
      const inputSample = 'testName';
      const outputSample = 'TestName!';
      cy.visit('/');
      cy.get('#inputNewTaskValue') //
        .type(inputSample)
        .type('{enter}');

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@addTask');
      cy.get('.lds-roller').should('not.exist');
      cy.get('#tasksToDoTemplate li') //
        .should('contain.text', outputSample);
    });
    it('Should show "loading-spinner" when remove ToDo task then hide after Response', () => {
      cy.intercept('**/action/deleteOne', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('removeTask');
      cy.visit('/');

      cy.get('#taskToDoList li').as('toDoList'); //
      cy.get('@toDoList') //
        .should('have.length', 4);

      cy.get('@toDoList') //
        .first()
        .find('#removeBtn')
        .click();

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@removeTask');
      cy.get('.lds-roller').should('not.exist');
      cy.get('@toDoList') //
        .should('have.length', 3);
    });
    it('Should show "loading-spinner" when update ToDo task as "Done" then hide after Response', () => {
      cy.intercept('**/action/updateOne', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('updateTask');
      cy.visit('/');

      cy.get('#taskToDoList li').as('toDoList'); //
      cy.get('#tasksDoneTemplate li') //
        .should('not.exist');
      cy.get('@toDoList') //
        .should('have.length', 4);

      cy.get('@toDoList') //
        .first()
        .find('#doneBtn')
        .click();

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@updateTask');
      cy.get('.lds-roller').should('not.exist');
      cy.get('@toDoList') //
        .should('have.length', 3);
      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 1);
    });
    it('Should show "loading-spinner" when clear Done tasks List then hide after Response', () => {
      cy.intercept('**/action/deleteMany', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('clearDoneTasks');
      cy.visit('/');

      cy.get('#taskToDoList li').first().find('#doneBtn').click();

      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 1);

      cy.contains('Clear Completed Tasks').click();

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@clearDoneTasks');
      cy.get('.lds-roller').should('not.exist');
      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 0);
    });

    afterEach(() => {
      cy.clearDB();
    });
  });

  context('with a mock response', () => {
    beforeEach(() => {
      cy.seedMockData('tasksDB');
    });
    it('Should show "loading-spinner" when data is loading then hide after Response', () => {
      cy.intercept('**/action/find', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.reply;
      }).as('getTasks');
      cy.visit('/');
      cy.get('.lds-roller').should('be.visible');
      cy.wait('@getTasks');
      cy.get('.lds-roller').should('not.exist');
      cy.contains('Clear Completed Tasks').click();
    });

    it('Should show "loading-spinner" when add a new task then hide after Response', () => {
      cy.intercept('**/action/insertOne', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('addTask');
      const inputSample = 'testName';
      const outputSample = 'TestName!';
      cy.visit('/');
      cy.get('#inputNewTaskValue') //
        .type(inputSample)
        .type('{enter}');

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@addTask');
      cy.get('.lds-roller').should('not.exist');
      cy.get('#tasksToDoTemplate li') //
        .should('contain.text', outputSample);
    });
    it('Should show "loading-spinner" when remove ToDo task then hide after Response', () => {
      cy.intercept('**/action/deleteOne', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('removeTask');
      cy.visit('/');

      cy.get('#taskToDoList li').as('toDoList'); //
      cy.get('@toDoList') //
        .should('have.length', 2);

      cy.get('@toDoList') //
        .first()
        .find('#removeBtn')
        .click();

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@removeTask');
      cy.get('.lds-roller').should('not.exist');
      cy.get('@toDoList') //
        .should('have.length', 1);
    });
    it('Should show "loading-spinner" when update ToDo task as "Done" then hide after Response', () => {
      cy.intercept('**/action/updateOne', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('updateTask');
      cy.visit('/');

      cy.get('#taskToDoList li').as('toDoList'); //
      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 2);
      cy.get('@toDoList') //
        .should('have.length', 2);

      cy.get('@toDoList') //
        .first()
        .find('#doneBtn')
        .click();

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@updateTask');
      cy.get('.lds-roller').should('not.exist');
      cy.get('@toDoList') //
        .should('have.length', 1);
      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 3);
    });
    it('Should show "loading-spinner" when clear Done tasks List then hide after Response', () => {
      cy.intercept('**/action/deleteMany', async (req) => {
        await Cypress.Promise.delay(1000);
        return req.continue();
      }).as('clearDoneTasks');
      cy.visit('/');

      cy.get('#taskToDoList li').first().find('#doneBtn').click();

      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 3);

      cy.contains('Clear Completed Tasks').click();

      cy.get('.lds-roller').should('be.visible');
      cy.wait('@clearDoneTasks');
      cy.get('.lds-roller').should('not.exist');
      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 0);
    });
  });
});
