/* eslint-disable no-undef */
describe('Blog app testing', () => {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#btntogglablelabel').contains('Open login').click()
    cy.get('#textlogintitle').contains('Log in to application')
  })

})