// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('基本语法-操作', function () {
    beforeEach(() => {
      cy.visit('https://www.jianshu.com/')
    })

    it('.click() 操作', function () {
      // .click() .click(options) .click(position)
      cy.get("#sign_in").click().url().should("contain", "sign_in").go(-1)
      cy.get("#sign_in").click({force: true}).url().should("contain", "sign_in").go(-1)
      cy.get("#sign_in").click({position: 'center'}).url().should("contain", "sign_in")
    })

    it('.dblclick() 操作', function () {
      // .dblclick() .dblclick(options) .dblclick(position)
      cy.get("#sign_in").dblclick().url().should("contain", "sign_in")
    })

    it('.rightclick()', function () {
			// .rightclick()
			cy.get("#sign_in").rightclick().should("be.visible")
    })

		it.only('.type()', function () {
			// .type(text) .type(text, option)
			cy.get("#q").type("cypress").should("have.value", "cypress")
    })

		it('.clear()', function () {
			// .clear()
			cy.get("#q").type("cypress").clear().should("have.value", "")
    })

		it('.trigger()', function () {
			// .trigger(eventName)
			cy.get(".qrcode").trigger("mouseover")
    })

		// .check() .uncheck() .select()
})
