/* eslint-disable no-undef */
describe('Blog app testing', () => {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createTestUser()
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#btntogglablelabel').contains('Open login').click()
    cy.get('#textlogintitle').contains('Log in to application')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.get('#btntogglablelabel').contains('Open login').click()
    })

    it('Successfull login', function() {
      cy.get('#inputusername').type('testUser')
      cy.get('#inputpassword').type('testUserPassword')
      cy.get('#btnlogin').click()

      cy.get('#textnotification').contains('Logged in!')
    })

    it('Invalid credentials login', function() {
      cy.get('#inputusername').type('vaara')
      cy.get('#inputpassword').type('vaara')
      cy.get('#btnlogin').click()

      cy.get('#textnotification').contains('Failed credentials. Check username or password')
    })
  })
})