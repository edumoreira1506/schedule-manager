describe('Login', () => {
  it('can login', () => {
    const email = 'admin@admin.com';
    const password = 'Password102030';
  
    cy.login(email, password);
    cy.contains('Bem vindo');
  });
});
