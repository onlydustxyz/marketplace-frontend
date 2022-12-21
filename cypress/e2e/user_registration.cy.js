describe("The user", () => {
    beforeEach(() => {
        cy.createUser().withGithubProvider(12345).then(user => {
            cy.signinUser(user).then(user => (JSON.stringify(user.session))).as('token')
        });

        cy.fixture('profiles/james_bond').as('profile');
    });

    it("can fill its personal info", function () {
        cy.visit('http://127.0.0.1:5173/profile', {
            onBeforeLoad(win) {
                win.localStorage.setItem('hasura_token', this.token)
            },
        });

        cy.get('[value=PERSON]').click();
        cy.get('[name=firstname]').clear().type(this.profile.firstname);
        cy.get('[name=lastname]').clear().type(this.profile.lastname);
        cy.get('[name=email]').clear().type(this.profile.email);
        cy.get('[name=number]').clear().type(this.profile.number);
        cy.get('[name=street]').clear().type(this.profile.street);
        cy.get('[name=postCode]').clear().type(this.profile.postCode);
        cy.get('[name=city]').clear().type(this.profile.city);
        cy.get('[name=country]').clear().type(this.profile.country);
        cy.get('[value=ETHEREUM_ADDRESS]').click();
        cy.get('[name=ethWalletAddress]').clear().type(this.profile.ethWalletAddress);

        cy.contains('Send').click();

        cy.contains('Your data has been saved!');
    });
});

describe("The company", () => {
    beforeEach(() => {
        cy.createUser().withGithubProvider(12345).then(user => {
            cy.signinUser(user).then(user => (JSON.stringify(user.session))).as('token')
        });
        cy.fixture('profiles/mi6').as('profile');
    });

    it("can fill its personal info", function () {
        cy.visit('http://127.0.0.1:5173/profile', {
            onBeforeLoad(win) {
                win.localStorage.setItem('hasura_token', this.token)
            },
        });

        cy.get('[value=COMPANY]').click();
        cy.get('[name=id]').clear().type(this.profile.id);
        cy.get('[name=name]').clear().type(this.profile.name);
        cy.get('[name=email]').clear().type(this.profile.email);
        cy.get('[name=number]').clear().type(this.profile.number);
        cy.get('[name=street]').clear().type(this.profile.street);
        cy.get('[name=postCode]').clear().type(this.profile.postCode);
        cy.get('[name=city]').clear().type(this.profile.city);
        cy.get('[name=country]').clear().type(this.profile.country);
        cy.get('[value=BANK_ADDRESS]').click();
        cy.get('[name=IBAN]').clear().type(this.profile.IBAN);
        cy.get('[name=BIC]').clear().type(this.profile.BIC);

        cy.contains('Send').click();

        cy.contains('Your data has been saved!');
    });
});
