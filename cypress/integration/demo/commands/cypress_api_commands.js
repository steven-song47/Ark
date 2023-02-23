// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('Cypress API-操作', function () {
    // Cypress.Commands Cypress.log 见support/commands.js

    it('Cypress.config 获取、设置配置项', function () {
      // Cypress.config()
      cy.log(Cypress.config())
      // Cypress.config(name, value)
      Cypress.config("execTimeout", 70000)
      // Cypress.config(name)
      cy.log(Cypress.config("execTimeout"))
      // Cypress.config(object)
      Cypress.config({
        "execTimeout": 65000
      })
      cy.log(Cypress.config("execTimeout"))
    })

    it('Cypress.env 获取、设置环境变量', function () {
      // Cypress.env()
      cy.log(`ENV: ${JSON.stringify(Cypress.env())}`)
      // Cypress.env(name, value)
      Cypress.env("key", "just test")
      // Cypress.env(name)
      cy.log(Cypress.env("key"))
      // Cypress.env(object)
      Cypress.env({
        "key": "test_key",
        "token": "test_token"
      })
      cy.log(Cypress.env("key"))
    })

    it('Cypress.platform 返回操作系统名称', function () {
      cy.log(Cypress.platform)
    })

    it('Cypress.version 返回正运行的Cypress版本', function () {
      cy.log(Cypress.version)
    })

    it('Cypress.arch 返回操作系统的CPU名称', function () {
      cy.log(Cypress.arch)
    })

    it('Cypress.spec 返回测试文件的属性', function () {
      cy.log(Cypress.spec)
      cy.wrap(Cypress.spec).then((obj) => {
        expect(obj).to.have.property("specType", "integration")
      })
    })

    it('Cypress.browser 返回浏览器属性', function () {
      cy.log(`Cypress.browser: ${JSON.stringify(Cypress.browser)}`)
    })

    context('Cypress.dom 与DOM元素相关的方法合集', function () {
      beforeEach(() => {
        cy.visit("https://www.jianshu.com/")
      })

      it('Cypress.dom.isAttached 判断元素是否附加到DOM树', function () {
        cy.get("#q").then(($el) => {
          expect(Cypress.dom.isAttached($el)).to.be.true
        })
      })

      it('Cypress.dom.isDescendent 判断一个元素是否是另一个元素后代', function () {
        cy.get("#q").then(($el) => {
          expect(Cypress.dom.isDescendent($el.parent(), $el)).to.be.true
        })
      })

      it('Cypress.dom.isDetached 判断一个元素是否与DOM树分离', function () {
        cy.get("#q").then(($el) => {
          expect(Cypress.dom.isDetached($el)).to.be.false
        })
      })

      it('Cypress.dom.isDocument 判断一个元素是否是document类型', function () {
        cy.get("#q").then(($el) => {
          expect(Cypress.dom.isDocument($el.text)).to.be.false
        })
      })

      it('Cypress.dom.isDom 判断一个元素是否是DOM对象', function () {
        cy.get("#q").parents().each(($el) => {
          expect(Cypress.dom.isDom($el)).to.be.true
        })
      })

      it('Cypress.dom.isElement 判断一个元素是否是DOM元素', function () {
        cy.get("#q").parents().each(($el) => {
          expect(Cypress.dom.isElement($el)).to.be.true
        })
      })

      it('Cypress.dom.isFocusable 判断一个元素是否可以接受焦点', function () {
        cy.get("#q").then(($el) => {
          expect(Cypress.dom.isFocusable($el)).to.be.true
        })
      })

      it('Cypress.dom.isHidden 判断一个元素是否隐藏', function () {
        cy.get("input[name='utf8']").then(($el) => {
          expect(Cypress.dom.isHidden($el)).to.be.true
        })
      })

      it('Cypress.dom.isVisible 判断一个元素是否可见', function () {
        cy.get("input[name='utf8']").then(($el) => {
          expect(Cypress.dom.isVisible($el)).to.be.false
        })
      })

      it('Cypress.dom.isScrollable 判断一个元素是否可滚动', function () {
        cy.get("#q").then(($el) => {
          expect(Cypress.dom.isScrollable($el)).to.be.false
        })
      })

    })

    context("Cypress.Cookies", function () {
      it('Cypress.Cookies.debug 是否启动Cookie调试', function () {
        Cypress.Cookies.debug(false)
      })

      it('Cypress.Cookies.preserveOnce 保存Cookie，多个用例共享', function () {
        // beforeEach(() => {
        //   Cypress.Cookies.preserveOnce("session_id")
        // })
      })

      it('Cypress.Cookies.defaults 设置全局默认Cookie', function () {
        // Cypress.Cookies.defaults({
        //   preserve: /session|cookie/
        // })
      })
    })

})