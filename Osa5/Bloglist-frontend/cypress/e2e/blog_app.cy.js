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

  describe('Logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testUser', password: 'testUserPassword' })
      cy.get('#btntogglablelabel').contains('create new').click()

    })

    it('test user logged in', function() {
      cy.get('#textloggedinuser').contains('Logged in: testUser')
    })

    it('Blog can be created', function() {
      cy.createBlog()
      cy.get('#textnotification').contains('New blog created!')
      cy.get('#divbloglist').contains('Title')
    })

    it('Blog can be liked', function() {
      cy.createBlog()
      cy.get('#btnblogvisibility').contains('View').click()
      cy.get('#btnbloglike').click()
    })

    it('Blog can be deleted', function() {
      cy.createBlog()
      cy.get('#btnblogvisibility').contains('View').click()
      cy.get('#btnblogdelete').should('have.css', 'display', 'inline-block')
      cy.get('#btnblogdelete').click()

      cy.get('html').should('not.contain', '#blogmain')
    })
  })
})