Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.get('[data-testid="login-email"]').type(Cypress.env('BUSINESS_EMAIL'));
  cy.get('[data-testid="login-password"]').type(Cypress.env('BUSINESS_PASSWORD'), { log: false });
  cy.get('[data-testid="login-submit"]').click();
  cy.get('[data-testid="user-name"]').should('be.visible');
});
