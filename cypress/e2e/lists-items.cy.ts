import { API_response } from './../../src/app/models/api_response';

describe('List with loaded Tasks', () => {
  beforeEach(() => {
    cy.seedMockData('tasksDB');
    cy.visit('/');
  });
  it('Should properly display name content for each task element from "Done" and "ToDo" Lists', () => {
    cy.fixture('tasksDB').then((response: API_response) => {
      const tasksToDo = response.documents
        .filter((task) => task.isDone === false)
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

      tasksToDo.forEach((task, index) => {
        cy.get(`#tasksToDoTemplate > ol > :nth-child(${index + 1})>p`).as(
          'taskToDo'
        );
        cy.get('@taskToDo').should(
          'contain.text',
          task.name.charAt(0).toUpperCase() + task.name.slice(1) + '!'
        );
      });

      const tasksDone = response.documents
        .filter((task) => task.isDone === true)
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

      tasksDone.forEach((task, index) => {
        cy.get(`#tasksDoneTemplate > ol > :nth-child(${index + 1})>div`).as(
          'taskDone'
        );
        cy.get('@taskDone').should(
          'contain.text',
          task.name.charAt(0).toUpperCase() +
            task.name.slice(1) +
            ' - well done!'
        );
      });
    });
  });
  it('Should properly displays completed items', () => {
    const styleValue =
      'rgb(195, 253, 137) url("http://localhost:4200/assets/checked.png") no-repeat scroll 10px 50% / auto padding-box border-box';
    cy.get('#tasksDoneTemplate> ol> li').as('completedTasks');
    cy.get('@completedTasks') //
      .should('have.length', 2);
    cy.get('@completedTasks').each(($li) => {
      cy.wrap($li).should('have.css', 'background', styleValue);
    });
  });

  it('Should shows number of todo and completed Tasks separately', () => {
    cy.get('#tasksToDoTemplate > p') //
      .should('contain.text', 'To do: 2');
    cy.get('#tasksDoneTemplate > p') //
      .should('contain.text', 'Tasks Done 2:');
  });

  it('Should show correctly displayed task creation time information in ToDo', () => {
    cy.fixture('tasksDB').then((response: API_response) => {
      const tasks = response.documents
        .filter((task) => task.isDone === false)
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

      tasks.forEach((task, index) => {
        cy.get(`#tasksToDoTemplate > ol > :nth-child(${index + 1})`).as(
          'taskToDo'
        );
        cy.get('@taskToDo').trigger('mouseenter');
        cy.get('@taskToDo')
          .find('#taskDate') //
          .should('be.visible')
          .and('have.css', 'z-index', '100')
          .and('have.css', 'position', 'absolute')
          .and('have.css', 'background-color', 'rgb(255, 255, 0)')
          .and('have.text', `Date: ${task.created}`);

        cy.get('@taskToDo').trigger('mouseleave');
        cy.get('@taskToDo')
          .find('#taskDate') //
          .should('not.exist');
      });
    });
  });
  it('Should show correctly displayed task end time information in Done', () => {
    cy.fixture('tasksDB').then((response: API_response) => {
      const tasks = response.documents
        .filter((task) => task.isDone === true)
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

      tasks.forEach((task, index) => {
        cy.get(`#tasksDoneTemplate > ol > :nth-child(${index + 1})`).as(
          'taskDone'
        );
        cy.get('@taskDone').trigger('mouseenter');
        cy.get('@taskDone')
          .find('#taskDate') //
          .should('be.visible')
          .and('have.css', 'z-index', '100')
          .and('have.css', 'position', 'absolute')
          .and('have.css', 'background-color', 'rgb(255, 255, 0)')
          .and('have.text', `Date: ${task.end}`);

        cy.get('@taskDone').trigger('mouseleave');
        cy.get('@taskDone')
          .find('#taskDate') //
          .should('not.exist');
      });
    });
  });
  context('Todo Items buttons', () => {
    it('Should removes todo', () => {
      cy.intercept(
        { method: 'POST', url: '**/action/deleteOne' },
        { statusCode: 200 }
      ).as('PostRequest(deleteOne)');

      cy.get('#taskToDoList li').as('toDoList'); //

      cy.get('@toDoList') //
        .first()
        .find('#removeBtn')
        .click();
      cy.wait('@PostRequest(deleteOne)');

      cy.get('@toDoList') //
        .should('have.length', 1)
        .and('not.contain', 'Meeting with Jon on Friday');
    });
    it('Should Move marked todo into completed tasks list', () => {
      cy.intercept(
        { method: 'POST', url: '**/action/updateOne' },
        { statusCode: 200 }
      ).as('PostRequest(updateOne)');

      cy.get('#taskToDoList li').as('toDoList'); //

      cy.get('@toDoList') //
        .first()
        .find('#doneBtn')
        .click();
      cy.wait('@PostRequest(updateOne)');

      cy.get('@toDoList') //
        .should('have.length', 1)
        .and('not.contain', 'Meeting with Jon on Friday');

      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 3)
        .and('contain', 'Meeting with Jon on Friday');
    });
  });
  context('Done tasks List button', () => {
    it('Should clear Done Tasks List', () => {
      cy.contains('Clear Completed Tasks') //
        .click();

      cy.get('#tasksDoneTemplate li') //
        .should('have.length', 0);
    });
  });
});

context('Empty tasks list', () => {
  beforeEach(() => {
    cy.clearDB();
    cy.visit('/');
  });

  it('Should change the color of the paragraph with the number of tasks to be performed depending on the number of tasks', () => {
    cy.get('#inputNewTaskValue') //
      .type('sampleName{enter}');

    cy.contains('To do:').should('have.css', 'color', 'rgb(0, 128, 0)');
    for (let i = 0; i < 4; i++) {
      cy.get('#inputNewTaskValue') //
        .type(`sampleName${i}{enter}`);
    }
    cy.contains('To do:').should('have.css', 'color', 'rgb(255, 0, 0)');
  });
  it('Should change the color of <li> with task to be performed depending on the task index and their number.', () => {
    for (let i = 0; i < 4; i++) {
      cy.get('#inputNewTaskValue') //
        .type(`sampleName${i}{enter}`);
    }

    cy.get('#taskToDoList li').as('tasksToDo');
    cy.get('@tasksToDo').should('have.length.above', 1);
    cy.get('@tasksToDo').each(($li, $index) => {
      if ($index % 2 === 1) {
        cy.wrap($li).should('have.class', 'odd-li');
      }
    });
  });
  it('Should change the color of <li> with last task', () => {
    cy.get('#inputNewTaskValue') //
      .type(`sampleName{enter}`);

    cy.get('#taskToDoList li')
      .should('have.length', 1)
      .and('have.class', 'last-list');
  });
});
