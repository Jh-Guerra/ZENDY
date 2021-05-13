const serverUrl = Cypress.env('serverUrl');

describe('Api Rest', () => {
    beforeEach(() => {
      // fixtures
      cy.fixture('example/all_before.json').as('usersJSON');
      cy.fixture('example/add.json').as('addUserJSON');
      cy.fixture('example/all_after.json').as('updatedJSON');
  
      // network stub
      cy.server();
      cy.route('GET', `${serverUrl}/users**`, '@usersJSON').as('getAllUsers');

      cy.visit('/');
      cy.get('button').click();
      cy.get('button').contains('Clock-In').click();
      cy.get('button').contains('Clock-Out').click();
      cy.get('[name="api-rest"]').click();
      cy.wait('@getAllUsers');
    });
  
    it('should display the page title', () => {
      cy.get('h4').contains('Api Rest');
    });

    it('should display the users list', () => {
      cy.get('.ag-center-cols-container > .ag-row').its('length').should('eq', 3);
      cy.get('.ag-center-cols-container > .ag-row').eq(2).contains('Holcomb Gallagher');
    });
  
    it('should add a new user to the list', () => {
        // network stubs
        cy.server();
        cy.route('GET', `${serverUrl}/users`, '@updatedJSON').as('getAllUsers');
        cy.route('POST', `${serverUrl}/users`, '@addUserJSON').as('addUser');

        cy.get('#newUser').should('not.exist');
        cy.contains('Add New').click({force: true});
        cy.get('#newUser').should('be.visible');
        cy.focused().type('Anghelo Aguilar');
        cy.get('#email').type('anghelo_aguilar@example.com');
        cy.get('#mui-component-select-gender').click();
        cy.get('[data-value="male"]').click();
        cy.get('#mui-component-select-status').click();
        cy.get('[data-value="enabled"]').click();
        cy.get('#newUser').find('form').submit();
        
        cy.wait('@addUser');
        cy.wait('@getAllUsers');
        cy.get('.ag-center-cols-container > .ag-row').its('length').should('eq', 4);
    });
  });