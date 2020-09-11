describe('Tasks', () => {
  it('can register new task', () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Password102030';
    const description = 'Descrição da tarefa!';
  
    cy.login(adminEmail, adminPassword);
    cy.clickLink('newTask');
    cy.fillInput('task-description', description);
    cy.fillInput('search-user', 'a');
    cy.get('.UserSearchInput__autocomplete-option').first().click();
    cy.clickButton('task-post-button');
    cy.confirmSwal();
    cy.clickLink('tasks');
    cy.contains(description);
  });

  it('can delete task', () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Password102030';
    const description = 'Descrição da tarefa!';
  
    cy.login(adminEmail, adminPassword);
    cy.clickLink('newTask');
    cy.fillInput('task-description', description);
    cy.fillInput('search-user', 'a');
    cy.get('.UserSearchInput__autocomplete-option').first().click();
    cy.clickButton('task-post-button');
    cy.confirmSwal();
    cy.clickLink('tasks');
    cy.contains(description);
    cy.get('[data-element="delete-task"]').last().click();
    cy.confirmSwal();
  });

  it('can edit task', () => {
    const adminEmail = 'admin@admin.com';
    const adminPassword = 'Password102030';
    const description = 'Descrição da tarefa!';
    const newDescription = 'Nova descrição da tarefa!';
  
    cy.login(adminEmail, adminPassword);
    cy.clickLink('newTask');
    cy.fillInput('task-description', description);
    cy.fillInput('search-user', 'a');
    cy.get('.UserSearchInput__autocomplete-option').first().click();
    cy.clickButton('task-post-button');
    cy.confirmSwal();
    cy.clickLink('tasks');
    cy.contains(description);
    cy.get('[data-element="edit-task"]').last().click();
    cy.fillInput('task-description', newDescription);
    cy.clickButton('task-post-button');
    cy.confirmSwal();
    cy.clickLink('tasks');
    cy.contains(newDescription);
  });
});
