describe('SLIDER', () => {
  it('Check Slider', () => {
    cy.visit('/')
    cy.get('.arrow-ctn').click()
    cy.get('.aside').should('have.class', 'expanded')
    cy.get('nav ul li:nth-child(4)').click()
    cy.get('.aside').should('not.have.class', 'expanded')
    cy.url().should('include', 'the-slider')
    cy.get('main > div').should('satisfy', ($el: HTMLAllCollection) => {
      const classList = Array.from($el[0].classList)
      return classList.includes('wrapper') && classList.includes('flex')
    })
    cy.get('main > div.wrapper').scrollTo(200, 0).invoke('scrollLeft').should('be.greaterThan', 100)
  })
})
