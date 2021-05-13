const serverUrl = Cypress.env('serverUrl');

describe('GraphQL Page', () => {
    beforeEach(() => {
      // fixtures
      cy.fixture('graphql/lots.json').as('lotsJSON');
  
      // network stub
      cy.server();
      cy.route('POST', `http://api.dev.blaze.me/api/v1/graphql`, '@lotsJSON').as('getLots');

      cy.visit('/');
      cy.get('button').click();
      cy.get('button').contains('Clock-In').click();
      cy.get('button').contains('Clock-Out').click();
      cy.get('[name="graphql"]').click();
      cy.wait('@getLots');
    });
  
    it('should display the page title', () => {
      cy.get('h4').contains('GraphQL');
    });

    it('should display the lots', () => {
      cy.get('.ag-center-cols-container > .ag-row').its('length').should('eq', 10);
      cy.get('.ag-center-cols-container > .ag-row').eq(2).contains('Created');
    });  
  });