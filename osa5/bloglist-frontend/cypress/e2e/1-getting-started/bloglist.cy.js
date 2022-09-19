describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'User1',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('User1')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('User1')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('http://localhost:3000')
      cy.get('#create-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog2')
      cy.get('#author').type('test author')
      cy.get('#url').type('http://localhost:3000')
      cy.get('#create-button').click()
      cy.contains('test blog test author')
    })

    it('a blog can be liked', function () {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
      cy.contains('like').click()
      cy.contains('likes 2')
    })

    it('a blog can be deleted', function () {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.get('html').should('not.contain', 'test blog test author')
    })
  })
})