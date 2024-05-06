describe('App initialization', () => {
  it('Should Loads tasks elements in page load', () => {
    cy.seedMockData('tasksDB');
    cy.visit('/');
    cy.get('ol > li') //
      .should('have.length', 4);
  });

  it('Should Displays an error on failure and make it close with button "OK"', () => {
    cy.intercept(
      { url: '**/action/find', method: 'POST' },
      { statusCode: 500, body: null }
    ).as('failureGetTasksStub');
    cy.visit('/');
    cy.wait('@failureGetTasksStub');
    cy.get('#tasksToDoTemplate') //
      .should('not.exist');
    cy.get('#tasksDoneTemplate') //
      .should('not.exist');
    cy.get('.alert-box') //
      .should('be.visible');
    cy.contains('OK').click();
    cy.get('.alert-box') //
      .should('not.exist');
  });
});
