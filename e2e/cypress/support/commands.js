Cypress.Commands.add('visitSite', () => {
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('fillInput', (dataSelector, value) => {
  cy.get(`[data-input="${dataSelector}"]`).clear();
  cy.get(`[data-input="${dataSelector}"]`).type(value);
});

Cypress.Commands.add('clickButton', (dataSelector) => {
  cy.get(`[data-element="${dataSelector}"]`).first().click();
});

Cypress.Commands.add('clickLink', (dataSelector) => {
  cy.get(`[data-link="${dataSelector}"]`).first().click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.visitSite();
  cy.fillInput('email', email);
  cy.fillInput('password', password);
  cy.clickButton('login');
});

Cypress.Commands.add('confirmSwal', () => {
  cy.get('.swal2-confirm').first().click();
});
