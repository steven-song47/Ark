export default class CommonPage {
    constructor () {
    }

    isTargetPage() {
        cy.url().should("eq", this.url)
    }
}