import CommonPage from "./common_page"

export default class LoginPage extends CommonPage{
    constructor() {
        super()
        this.url = "https://passport.csdn.net/login?code=mobile"
        this.typeLocator = "#tabOne"
        this.userNameLocator = "input[name='all']"
        this.passwordLocator = "input[name='pwd']"
        this.submitLocator = "button[data-type='account']"
    }

    get type() {
        return cy.get(this.typeLocator)
    }

    get username() {
        return cy.get(this.userNameLocator)
    }

    get password() {
        return cy.get(this.passwordLocator)
    }

    get submit() {
        return cy.get(this.submitLocator)
    }

    visitPage() {
        cy.visit(this.url)
    }

    login(userName, passWord) {
        this.type.click()
        this.username.type(userName)
        this.password.type(passWord, {sensitive: true})
        this.submit.click()
    }
}