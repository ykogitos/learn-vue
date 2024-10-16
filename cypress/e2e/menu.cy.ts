describe('Open Menu', () => {
  it('Check open/close  menu', () => {
    cy.visit('/')
    cy.get('.arrow-ctn').click()
    cy.get('.aside').should('have.class', 'expanded')
    cy.get('.arrow-ctn').click()
    cy.get('.aside').should('not.have.class', 'expanded')
  })

  it('Check links', () => {
    cy.visit('/')
    cy.get('.arrow-ctn').click()
    cy.get('nav ul li:nth-child(3)').click()
    cy.url().should('include', 'the-form')
    cy.get('.aside').should('not.have.class', 'expanded')
  })
})
