describe('Wordle', () => {
  it('Check feature', () => {
    cy.visit('/')
    cy.get('.arrow-ctn').click()
    cy.get('.aside').should('have.class', 'expanded')
    cy.get('nav ul li:nth-child(4)').click()
    cy.get('.aside').should('not.have.class', 'expanded')
    cy.url().should('include', 'the-wordle')
    cy.focused().should('have.attr', 'class', 'wordle')
    const words = ['TESTS', 'WRONG', 'CALLS', 'BELLS', 'LIVES', 'TWIST']
    words.forEach((word, wordIndex) => {
      describe(`The first row should contain lettes ${word}`, () => {
        const wordSplit = word.split('')
        cy.get('input.wordle').type(word + '{enter}')
        wordSplit.forEach((letter, letterIndex) => {
          cy.get(
            '.wrapper-wordle > ul > li:nth-child(' +
              (wordIndex + 1) +
              ') > ul > li:nth-child( ' +
              (letterIndex + 1) +
              ')'
          ).should('include.text', letter)
        })
      })
    })
    cy.get('main div + div > div button').should('contain.text', 'New Game')
    cy.get('main div + div p').should('contain.text', 'Better luck next time')
  })
})
