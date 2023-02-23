// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('针对弹出框场景', function () {
	it('不消失的弹出框场景', function () {
		cy.visit("https://www.jianshu.com/")
        // cy.get(".style-mode-btn").children().first().click().then(() => {
        //     cy.get(".popover-modal").children().eq(1).children().first().click().then(() => {
        //         cy.get(".popover-modal").children().eq(1).children().first().should("have.class", "switch-btn active")
        //     })
        // })

        cy.get(".style-mode-btn").children().first().click()
        cy.get(".popover-modal").children().eq(1).children().first().click()
        cy.get(".popover-modal").children().eq(1).children().first().should("have.class", "switch-btn active")
	})
})