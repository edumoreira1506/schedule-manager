describe('Users', () => {
  it('can register new user', () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Password102030';
    const email = 'eduardo@moreira.com';
    const password = 'Password102030';
    const name = 'Eduardo Moreira';
  
    cy.login(adminEmail, adminPassword);
    cy.clickLink('newUser');
    cy.fillInput('user-name', name);
    cy.fillInput('user-password', password);
    cy.fillInput('user-confirm-password', password);
    cy.fillInput('user-email', email);
    cy.clickButton('user-post-button');
    cy.confirmSwal();
    cy.clickLink('listUsers');
    cy.contains(email);
    cy.contains(name);
  });

  it('can delete user', () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Password102030';
    const email = 'eduardo@moreira.com.br';
    const password = 'Password102030';
    const name = 'Eduardo Moreira';
  
    cy.login(adminEmail, adminPassword);
    cy.clickLink('newUser');
    cy.fillInput('user-name', name);
    cy.fillInput('user-password', password);
    cy.fillInput('user-confirm-password', password);
    cy.fillInput('user-email', email);
    cy.clickButton('user-post-button');
    cy.confirmSwal();
    cy.clickLink('listUsers');
    cy.contains(email);
    cy.contains(name);
    cy.get('[data-element="delete-user"]').last().click();
    cy.confirmSwal();
  });

  it('can edit user', () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Password102030';
    const email = 'eduardo@moreira.com.br';
    const password = 'Password102030';
    const name = 'Eduardo Moreira';
    const newName = 'Eduardo Moreira Novo!';
    const newEmail = 'teste@teste.com';
  
    cy.login(adminEmail, adminPassword);
    cy.clickLink('newUser');
    cy.fillInput('user-name', name);
    cy.fillInput('user-password', password);
    cy.fillInput('user-confirm-password', password);
    cy.fillInput('user-email', email);
    cy.clickButton('user-post-button');
    cy.confirmSwal();
    cy.clickLink('listUsers');
    cy.contains(email);
    cy.contains(name);
    cy.get('[data-element="edit-user"]').last().click();
    cy.fillInput('user-name', newName);
    cy.fillInput('user-email', newEmail);
    cy.clickButton('user-post-button');
    cy.confirmSwal();
    cy.clickLink('listUsers');
    cy.contains(newName);
    cy.contains(newEmail);
  });
});
