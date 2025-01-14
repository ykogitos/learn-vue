describe('Tic Tac Toe', () => {
  it('Check Slider', () => {
    cy.visit('/')
    cy.get('.arrow-ctn').click()
    cy.get('.aside').should('have.class', 'expanded')
    cy.get('nav ul li:nth-child(4)').click()
    cy.get('.aside').should('not.have.class', 'expanded')
    cy.url().should('include', 'the-slider')
  })
})
