// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />
import LoginPage from "../../../support/pages/login"

describe('PageObject场景', function () {

    before(() => {
        cy.fixture("login.json").as("loginData")
    })

	it('登录网页', function () {
		// const login = new LoginPage()
        // login.visitPage()
        // login.isTargetPage()
        // login.login(this.loginData.username, this.loginData.password)
        cy.login(this.loginData.username, this.loginData.password)
        // cy.contains("请按住滑块，拖动到最右边").should("exist")
	})
})