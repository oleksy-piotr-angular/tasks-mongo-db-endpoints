describe('Input AddTask form', () => {
  beforeEach(() => {
    cy.emptyMockData();
    cy.visit('/');
  });
  it('Should be input focused on load', () => {
    cy.visit('/');
    cy.focused() //
      .should('have.id', 'inputNewTaskValue');
  });
  it('Should accepts Input', () => {
    const typedText = 'buy butter';
    cy.get('#inputNewTaskValue') //
      .type(typedText)
      .should('have.value', typedText);
  });

  context('Form submission', () => {
    beforeEach(() => {
      cy.intercept({ method: 'POST', url: '**/action/insertOne' }).as(
        'PostRequest(insertOne)'
      );
    });

    it('Should Adds new task on submit when press "enter" key', () => {
      const inputText = 'buy bread';
      const outputText = 'Buy bread!';

      cy.get('#inputNewTaskValue') //
        .as('inputTask');
      cy.get('@inputTask') //
        .type(inputText)
        .type('{enter}');
      cy.get('@inputTask') //
        .should('have.value', '');
      cy.wait('@PostRequest(insertOne)');
      cy.get('#taskToDoList li') //
        .should('have.length', 1)
        .and('contain', outputText); // of "transformTask"
    });

    it('Should Adds new task on submit when click "Add" button', () => {
      const inputText = 'buy bread';
      const outputText = 'Buy bread!';

      cy.get('#inputNewTaskValue') //
        .as('inputTask');
      cy.get('@inputTask') //
        .type(inputText);
      cy.get('[type="submit"]').click();
      cy.get('@inputTask') //
        .should('have.value', '');
      cy.wait('@PostRequest(insertOne)');
      cy.get('#taskToDoList li') //
        .should('have.length', 1)
        .and('contain', outputText); // of "transformTask"
    });

    context('Input Form Submission Errors', () => {
      it('Should Show error message on too short task name', () => {
        cy.get('#inputNewTaskValue') //
          .type('test{enter}');
        cy.get('#taskToDoList li') //
          .should('not.exist');
        cy.get('.alert-box') //
          .should('be.visible')
          .and('contain', 'Name value is too short..')
          .and('contain', 'Name value must be greater than 5 characters!');
      });
      it('Should Show error message on "Internal Server Error"', () => {
        cy.intercept(
          { method: 'POST', url: '**/action/insertOne' },
          { statusCode: 500, body: {} }
        );
        cy.get('#inputNewTaskValue') //
          .type('Server Error{enter}');
        cy.get('#taskToDoList li') //
          .should('not.exist');
        cy.get('.alert-box') //
          .should('be.visible')
          .and('contain', 'HttpErrorResponse')
          .and('contain', 'Unknown Error');
      });
    });
  });
});
