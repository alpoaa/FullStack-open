/* eslint-disable no-undef */
describe('Blog app testing', () => {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it.only('Login form is shown', function() {
    cy.get('#toggleBtnLabel').contains('Open login')
  })

})