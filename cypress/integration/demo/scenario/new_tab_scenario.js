// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('新打开页面场景', function () {
	it('通过windwo.open()方式打开的页面', function () {
		cy.visit("https://www.jianshu.com/", {
			onBeforeLoad(win) {
				cy.stub(win, "open")
			},
		})
		cy.get(".width-limit").children().eq(1).click()
		cy.window().its("open").should("be.called")
	})
})