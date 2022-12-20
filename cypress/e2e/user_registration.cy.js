describe("The user", () => {
    beforeEach(() => {
        cy.createUser().withGithubProvider(12345).then(user => {
            cy.signinUser(user).then(user => (JSON.stringify(user.session))).as('token')
        })
    });

    it("can fill its personal info", () => {
        cy.visit('http://127.0.0.1:5173/profile', {
            onBeforeLoad(win) {
                win.localStorage.setItem('hasura_token', this.token)
            },
        });

        cy.get('[value=PERSON]').click();
        cy.get('[name=firstname]').clear().type('James');
        cy.get('[name=lastname]').clear().type('Bond');
        cy.get('[name=email]').clear().type('james.bond@mi6.com');
        cy.get('[name=number]').clear().type('007');
        cy.get('[name=street]').clear().type('Big Ben Street');
        cy.get('[name=postCode]').clear().type('007GB');
        cy.get('[name=city]').clear().type('London');
        cy.get('[name=country]').clear().type('GB');
        cy.get('[value=ETHEREUM_ADDRESS]').click();
        cy.get('[name=ethWalletAddress]').clear().type('0x777777777777777777');

        cy.contains('Send').click();

        cy.contains('Your data has been saved!');
    });
});

describe("The company", () => {
    beforeEach(() => {
        cy.createUser().withGithubProvider(12345).then(user => {
            cy.signinUser(user).then(user => (JSON.stringify(user.session))).as('token')
        })
    });

    it("can fill its personal info", () => {
        cy.visit('http://127.0.0.1:5173/profile', {
            onBeforeLoad(win) {
                win.localStorage.setItem('hasura_token', this.token)
            },
        });

        cy.get('[value=COMPANY]').click();
        cy.get('[name=id]').clear().type('007');
        cy.get('[name=name]').clear().type('MI6');
        cy.get('[name=email]').clear().type('admin@mi6.com');
        cy.get('[name=number]').clear().type('007');
        cy.get('[name=street]').clear().type('Big Ben Street');
        cy.get('[name=postCode]').clear().type('007GB');
        cy.get('[name=city]').clear().type('London');
        cy.get('[name=country]').clear().type('GB');
        cy.get('[value=BANK_ADDRESS]').click();
        cy.get('[name=IBAN]').clear().type('GB7611315000011234567890138');
        cy.get('[name=BIC]').clear().type('CITTGB2LXXX');

        cy.contains('Send').click();

        cy.contains('Your data has been saved!');
    });
});
