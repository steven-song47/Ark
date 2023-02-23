// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import LoginPage from "./pages/login"

Cypress.Commands.add("login", (phoneNumber, password) => {
    // 命令暂不可用，登录后存在动态图片验证码
    // cy.visit("https://passport.csdn.net/login?code=mobile")
    // cy.get("#tabOne").click()
    // cy.get("input[name='all']").type(phoneNumber)
    // cy.get("input[name='pwd']").type(password, {sensitive: true})
    // cy.get("button[data-type='account']").click()
    const login = new LoginPage()
    login.visitPage()
    login.isTargetPage()
    login.login(phoneNumber, password)
})

Cypress.Commands.overwrite("type", (fn ,element, text, options) => {
    if (options && options.sensitive) {
        options.log = false
        Cypress.log({
            $el: element,
            name: 'type',
            message: "*".repeat(text.length),
        })
    }
    return fn(element, text, options)
})