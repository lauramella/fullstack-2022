Cypress.Commands.add('newBlog', ( title, author, url ) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: { title, author, url },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
        }
    });
    cy.visit('http://localhost:3000');
});