describe('VerifyKeyPage Layout', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the page header', () => {
    cy.get('.verify-key-page-div h1').should('be.visible').and('contain', 'Indtast nøgle');
  });

  it('should display the instructions paragraph', () => {
    cy.get('.enter-key-text')
      .should('be.visible')
      .and('contain', 'Indtast nøglen som De har modtaget ved skranken.');
  });

  it('should display the key input field with placeholder text', () => {
    cy.get('.key-input')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Indtast din nøgle her');
  });

  it('should display the "Log ind" button', () => {
    cy.get('.key-button').should('be.visible').and('contain', 'Log ind');
  });

  it('should display the "Verificer din stemme" button', () => {
    cy.get('.verify-button').should('be.visible').and('contain', 'Verificer din stemme');
  });
});
