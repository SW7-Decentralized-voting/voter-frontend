describe('VerifyKeyPage Layout', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.intercept('GET', Cypress.env('BACKEND_URL') + '/pollingStations/*', {
      statusCode: 200,
      body: {
        pollingStation: '6720c9073b17ad2d0922002e',
        port: 3001
      },
    });
  });
  
 
  it('should display an error message for an invalid key', () => {
    // Intercept the API request before triggering the action
    cy.intercept('POST', Cypress.env('BACKEND_URL') + '/key/verify', {
      statusCode: 401,
      body: {
        error: 'Invalid key'
      }
    }).as('verifyInvalidKey');

    // Enter an invalid key
    cy.get('.key-input').type('invalid-key');
    cy.get('.key-button').click();

    // Wait for the API call and check for error message
    cy.contains('Forkert nøgle, prøv venligst igen.').should('be.visible');
  });

  it('should navigate to the voting page for a valid key', () => {
    // Mock the API response for valid key verification
    cy.intercept('POST', Cypress.env('BACKEND_URL') + '/key/verify', {
      statusCode: 200,
      body: { token: 'valid-jwt-token' },
    }).as('verifyValidKey');

    // Enter a valid key
    cy.get('.key-input').type('valid-key');
    cy.get('.key-button').click();

    // Wait for the API call and check for navigation
    cy.url().should('include', '/voting');
    cy.window().its('sessionStorage').invoke('getItem', 'jwt').should('eq', 'valid-jwt-token');
  });
});
