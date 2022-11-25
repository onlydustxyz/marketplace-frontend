describe('Hasura Auth', () => {
    it('can register a user', () => {
        cy.createUser();
    });
});
