describe('As authentication service I', () => {
    it('can register a new user', () => {
        cy.createUser();
    });
});
