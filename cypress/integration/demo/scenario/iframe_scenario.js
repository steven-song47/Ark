// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('针对iframe结构场景', function () {
	it('针对iframe中元素操作', function () {
		cy.visit("http://www.cnhubei.com/")
        cy.get(".w1200").children("iframe").should(($topIframe) => {
            expect($topIframe.contents().find("head")).to.exist
        }).then(($topIframe) => {
            return cy.wrap($topIframe.contents().find("title"))
        }).as("el")
        cy.get("@el").should("have.text", "东湖社区")
	})
})