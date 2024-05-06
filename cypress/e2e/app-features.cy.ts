import { API_response } from '../../src/app/models/api_response';
import { environment } from '../../src/environments/environment';

describe('All available App features', () => {
  beforeEach(() => {
    cy.clearDB();
  });
  context('Without tasks', () => {
    it('Should Save new task', () => {
      interface TestItem {
        name: string;
        expectedLength: number;
      }
      const samples: TestItem[] = [
        { name: 'buy cola', expectedLength: 1 },
        { name: 'buy sausage', expectedLength: 2 },
        { name: 'buy mineral water', expectedLength: 3 },
        { name: 'buy potatoes', expectedLength: 4 },
      ];
      cy.visit('/');
      cy.intercept({ method: 'POST', url: '**/action/insertOne' }).as('create');
      cy.wrap(samples).each((task: TestItem) => {
        cy.focused() //
          .type(task.name)
          .type('{enter}');
        cy.wait('@create');
        cy.get('#tasksToDoTemplate>ol>li').should(
          'have.length',
          task.expectedLength
        );
      });
    });
  });

  context('With active tasks', () => {
    beforeEach(() => {
      cy.fixture('tasksDB').then((response: API_response) => {
        const tasks = response.documents;
        tasks.forEach((task) => {
          cy.log(task.name);
          const newTask = Cypress._.merge(task, {
            isDone: false,
            end: undefined,
          });
          const _body = {
            dataSource: environment.DATA_SOURCE,
            database: environment.DATABASE,
            collection: environment.COLLECTION,
            document: newTask,
          };
          cy.request(
            'POST',
            `${environment.URL_ENDPOINT}/action/insertOne`,
            _body
          );
        });
      });
      cy.visit('/');
    });
    it('Should Loads existing data from DB', () => {
      cy.get('#tasksToDoTemplate>ol>li').should('have.length', 4);
    });
    it('Should Delete tasks', () => {
      cy.intercept({ method: 'POST', url: '**/action/deleteOne' }).as('delete');
      cy.get('#tasksToDoTemplate li').as('todoTasksList');
      const clickRemoveAndWait = (_alias: string) => {
        cy.get(_alias) //
          .first()
          .find('button#removeBtn')
          .click();

        cy.wait('@delete');
      };
      cy.get('@todoTasksList')
        .each(() => {
          clickRemoveAndWait('@todoTasksList');
        }) //
        .should('not.exist');
    });
    it('Should Update all tasks to "Done" and clear completed Tasks', () => {
      cy.intercept({ method: 'POST', url: '**/action/updateOne' }).as('update');
      cy.get('#tasksToDoTemplate li').as('todoTasksList');
      const clickDoneAndWait = (_alias: string) => {
        cy.get(_alias) //
          .first()
          .find('button#doneBtn')
          .click();

        cy.wait('@update');
      };
      cy.get('@todoTasksList')
        .each(() => {
          clickDoneAndWait('@todoTasksList');
        }) //
        .should('not.exist');
      cy.get('#tasksToDoTemplate')
        .should('contain.text', 'To do: 0')
        .and('contain.text', 'No tasks... Now you have free time to relax...');

      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 4);
      cy.contains('Clear Completed Tasks') //
        .should('exist')
        .click();
      cy.get('#tasksDoneTemplate') //
        .should('not.exist');
      cy.get('#tasksToDoTemplate') //
        .should('not.exist');
    });
  });
});
