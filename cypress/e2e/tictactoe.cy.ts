describe('Tic Tac Toe', () => {
  it('Check feature', () => {
    cy.visit('/')
    cy.get('.arrow-ctn').click()
    cy.get('.aside').should('have.class', 'expanded')
    cy.get('nav ul li:nth-child(2)').click()
    cy.get('.aside').should('not.have.class', 'expanded')
    cy.url().should('include', 'tic-tac-toe')
    cy.get('main > div > div > div > div > div').should('have.length', 4)
    cy.get('main > div > div > div > div > div:nth-child(3)').click()
    cy.get('.game-ctn button').should('have.length', 25)
    cy.get('main > div > div > div > div > div:nth-child(1)').click()
    cy.get('.game-ctn button').should('have.length', 9)
    let squares = [1, 2, 3, 5, 4, 6, 8, 7, 9]
    for (const square of squares) {
      cy.get('.game-ctn button:nth-child(' + square + ')').click()
    }
    cy.get('.board').should('include.text', 'Free squares: 0 / 9')
    cy.get('.board p').should('include.text', 'No winner')
    cy.get('main > div > div > div > div > div:nth-child(1)').click()
    squares = [5, 3, 1, 9, 4, 6]
    for (const square of squares) {
      cy.get('.game-ctn button:nth-child(' + square + ')').click()
    }
    cy.get('.board').should('include.text', 'Free squares: 3 / 9')
    cy.get('.board p').should('include.text', 'Winner is O')
  })
})
